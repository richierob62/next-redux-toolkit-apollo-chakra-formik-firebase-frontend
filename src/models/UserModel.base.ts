/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CommentModel, CommentModelType } from "./CommentModel"
import { CommentModelSelector } from "./CommentModel.base"
import { PostModel, PostModelType } from "./PostModel"
import { PostModelSelector } from "./PostModel.base"
import { VoteModel, VoteModelType } from "./VoteModel"
import { VoteModelSelector } from "./VoteModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  posts: IObservableArray<PostModelType>;
  votes: IObservableArray<VoteModelType>;
  comments: IObservableArray<CommentModelType>;
}

/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = withTypedRefs<Refs>()(ModelBase
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.union(types.undefined, types.string),
    email: types.union(types.undefined, types.string),
    email_verified: types.union(types.undefined, types.boolean),
    name: types.union(types.undefined, types.null, types.string),
    firstName: types.union(types.undefined, types.null, types.string),
    lastName: types.union(types.undefined, types.null, types.string),
    fullName: types.union(types.undefined, types.string),
    posts: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => PostModel)))),
    votes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => VoteModel)))),
    comments: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => CommentModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get email() { return this.__attr(`email`) }
  get email_verified() { return this.__attr(`email_verified`) }
  get name() { return this.__attr(`name`) }
  get firstName() { return this.__attr(`firstName`) }
  get lastName() { return this.__attr(`lastName`) }
  get fullName() { return this.__attr(`fullName`) }
  posts(builder?: string | PostModelSelector | ((selector: PostModelSelector) => PostModelSelector)) { return this.__child(`posts`, PostModelSelector, builder) }
  votes(builder?: string | VoteModelSelector | ((selector: VoteModelSelector) => VoteModelSelector)) { return this.__child(`votes`, VoteModelSelector, builder) }
  comments(builder?: string | CommentModelSelector | ((selector: CommentModelSelector) => CommentModelSelector)) { return this.__child(`comments`, CommentModelSelector, builder) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().email.email_verified.name.firstName.lastName.fullName
