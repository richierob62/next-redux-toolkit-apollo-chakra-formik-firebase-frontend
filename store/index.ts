import {
  Instance,
  applySnapshot,
  flow,
  onSnapshot,
  types,
} from 'mobx-state-tree';

import { allPosts } from '../graphql/posts/all_posts';
import { client } from '../services';
import { useMemo } from 'react';

export type IStore = Instance<typeof MyStore>;

const User = types.model({
  __typename: 'User',
  id: types.identifier,
  email: types.string,
  email_verified: types.boolean,
  name: types.maybeNull(types.string),
  firstName: types.maybeNull(types.string),
  lastName: types.maybeNull(types.string),
  fullName: types.maybeNull(types.string),
  posts: types.maybeNull(types.array(types.late((): any => Post))),
  votes: types.maybeNull(types.array(types.late((): any => Vote))),
  comments: types.maybeNull(types.array(types.late((): any => Comment))),
});

const Post = types.model({
  __typename: 'Post',
  id: types.identifier,
  title: types.string,
  body: types.string,
  user: types.late((): any => User),
  comments: types.array(types.late((): any => Comment)),
  votes: types.maybeNull(types.array(types.late((): any => Vote))),
  createdAt: types.string,
  updatedAt: types.string,
  numVotes: types.number,
});

export interface IPost extends Instance<typeof Post> {}

const Vote = types.model({
  __typename: 'Vote',
  id: types.identifier,
  type: types.string,
  post: types.union(
    types.undefined,
    types.null,
    types.late((): any => Post)
  ),
  comment: types.union(
    types.undefined,
    types.null,
    types.late((): any => Comment)
  ),
  user: types.late((): any => User),
});

const Comment = types.model({
  __typename: 'Comment',
  id: types.identifier,
  body: types.string,
  post: types.maybeNull(types.late((): any => Post)),
  user: types.maybeNull(types.late((): any => User)),
  votes: types.maybeNull(types.array(types.late((): any => Vote))),
  numVotes: types.number,
});

const MyStore = types
  .model('MyStore', {
    posts: types.array(Post),
  })
  .views((self) => ({}))
  .actions((self) => {
    const getPosts = flow(function* () {
      const { data } = yield client.query({
        query: allPosts,
        fetchPolicy: 'network-only',
      });

      if (data) {
        self.posts = data.allPosts;
      }
    });

    return {
      getPosts,
    };
  });

let startupValues = {
  posts: [],
  title: '',
};

if (process.browser) {
  const data = localStorage.getItem('rootState');
  if (data) {
    const json = JSON.parse(data);
    if (MyStore.is(json)) {
      startupValues = json as any;
    }
  }
}

let store: IStore | undefined;

export function initializeStore(snapshot = null) {
  const _store = store ?? MyStore.create(startupValues);

  onSnapshot(_store, (snapshot) => {
    if (process.browser) {
      localStorage.setItem('rootState', JSON.stringify(snapshot));
    }
  });

  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  if (typeof window === 'undefined') return _store; // always create a new store from server
  if (!store) store = _store;

  return store;
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  return store;
}
