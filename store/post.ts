import { Instance, types } from 'mobx-state-tree';

import Comment from './comment';
import User from './user';
import Vote from './vote';

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

export default Post;
