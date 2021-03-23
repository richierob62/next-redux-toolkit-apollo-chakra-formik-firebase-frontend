import Comment from './comment';
import Post from './post';
import User from './user';
import { types } from 'mobx-state-tree';

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

export default Vote;
