/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CommentModel, CommentModelType } from "./CommentModel"
import { CommentModelSelector } from "./CommentModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { VoteModel, VoteModelType } from "./VoteModel"
import { VoteModelSelector } from "./VoteModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  comments: IObservableArray<CommentModelType>;
  votes: IObservableArray<VoteModelType>;
}

/**
 * PostBase
 * auto generated base class for the model PostModel.
 */
export const PostModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Post')
  .props({
    __typename: types.optional(types.literal("Post"), "Post"),
    id: types.identifier,
    title: types.union(types.undefined, types.string),
    body: types.union(types.undefined, types.string),
    user: types.union(types.undefined, types.late((): any => UserModel)),
    comments: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => CommentModel)))),
    votes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => VoteModel)))),
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    numVotes: types.union(types.undefined, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class PostModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get title() { return this.__attr(`title`) }
  get body() { return this.__attr(`body`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get numVotes() { return this.__attr(`numVotes`) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
  comments(builder?: string | CommentModelSelector | ((selector: CommentModelSelector) => CommentModelSelector)) { return this.__child(`comments`, CommentModelSelector, builder) }
  votes(builder?: string | VoteModelSelector | ((selector: VoteModelSelector) => VoteModelSelector)) { return this.__child(`votes`, VoteModelSelector, builder) }
}
export function selectFromPost() {
  return new PostModelSelector()
}

export const postModelPrimitives = selectFromPost().title.body.createdAt.updatedAt.numVotes
