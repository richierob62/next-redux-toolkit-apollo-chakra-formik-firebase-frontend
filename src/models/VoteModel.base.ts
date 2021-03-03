/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CommentModel, CommentModelType } from "./CommentModel"
import { CommentModelSelector } from "./CommentModel.base"
import { PostModel, PostModelType } from "./PostModel"
import { PostModelSelector } from "./PostModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  post: PostModelType;
  comment: CommentModelType;
}

/**
 * VoteBase
 * auto generated base class for the model VoteModel.
 */
export const VoteModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Vote')
  .props({
    __typename: types.optional(types.literal("Vote"), "Vote"),
    id: types.identifier,
    type: types.union(types.undefined, types.string),
    post: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => PostModel))),
    comment: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => CommentModel))),
    user: types.union(types.undefined, types.late((): any => UserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class VoteModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get type() { return this.__attr(`type`) }
  post(builder?: string | PostModelSelector | ((selector: PostModelSelector) => PostModelSelector)) { return this.__child(`post`, PostModelSelector, builder) }
  comment(builder?: string | CommentModelSelector | ((selector: CommentModelSelector) => CommentModelSelector)) { return this.__child(`comment`, CommentModelSelector, builder) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
}
export function selectFromVote() {
  return new VoteModelSelector()
}

export const voteModelPrimitives = selectFromVote().type
