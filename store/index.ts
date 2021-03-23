import {
  Instance,
  applySnapshot,
  flow,
  onSnapshot,
  types,
} from 'mobx-state-tree';
import { createMachine, machineConfig } from './state_machine';

import Post from './post';
import { allPosts } from '../graphql/posts/all_posts';
import { client } from '../services';
import { useMemo } from 'react';

export type IStore = Instance<typeof MyStore>;

const MyStore = types
  .model('MyStore', {
    posts: types.array(Post),
    machineConfig: types.frozen(),
  })
  .views((self: any) => ({
    get state() {
      return self.machineState.value;
    },
  }))
  .volatile(() => ({
    machine: undefined,
    machineState: undefined,
  }))
  .actions((self: any) => ({
    getPosts: flow(function* () {
      const { data } = yield client.query({
        query: allPosts,
        fetchPolicy: 'network-only',
      });

      if (data) {
        self.posts = data.allPosts;
      }
    }),
    afterCreate() {
      self.machine = createMachine();
      self.machine.onTransition(self.updateState);
      self.machine.start();
    },
    updateState() {
      self.machineState = self.machine.state;
    },
    send(val: any) {
      self.machine.send(val);
    },
  }));

let startupValues = {
  posts: [],
  machineConfig,
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
