import Post from './post';
import User from './user';
import Vote from './vote';
import { types } from 'mobx-state-tree';

const Comment = types.model({
  __typename: 'Comment',
  id: types.identifier,
  body: types.string,
  post: types.maybeNull(types.late((): any => Post)),
  user: types.maybeNull(types.late((): any => User)),
  votes: types.maybeNull(types.array(types.late((): any => Vote))),
  numVotes: types.number,
});

export default Comment;
