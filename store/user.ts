import Comment from './comment';
import Post from './post';
import Vote from './vote';
import { types } from 'mobx-state-tree';

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

export default User;
