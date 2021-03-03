/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PostModel, PostModelType } from "./PostModel"
import { PostModelSelector } from "./PostModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { VoteModel, VoteModelType } from "./VoteModel"
import { VoteModelSelector } from "./VoteModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  post: PostModelType;
  votes: IObservableArray<VoteModelType>;
}

/**
 * CommentBase
 * auto generated base class for the model CommentModel.
 */
export const CommentModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Comment')
  .props({
    __typename: types.optional(types.literal("Comment"), "Comment"),
    id: types.identifier,
    body: types.union(types.undefined, types.string),
    post: types.union(types.undefined, MSTGQLRef(types.late((): any => PostModel))),
    user: types.union(types.undefined, types.late((): any => UserModel)),
    votes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => VoteModel)))),
    numVotes: types.union(types.undefined, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class CommentModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get body() { return this.__attr(`body`) }
  get numVotes() { return this.__attr(`numVotes`) }
  post(builder?: string | PostModelSelector | ((selector: PostModelSelector) => PostModelSelector)) { return this.__child(`post`, PostModelSelector, builder) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
  votes(builder?: string | VoteModelSelector | ((selector: VoteModelSelector) => VoteModelSelector)) { return this.__child(`votes`, VoteModelSelector, builder) }
}
export function selectFromComment() {
  return new CommentModelSelector()
}

export const commentModelPrimitives = selectFromComment().body.numVotes
