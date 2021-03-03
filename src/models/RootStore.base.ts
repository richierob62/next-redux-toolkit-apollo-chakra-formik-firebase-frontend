/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { CommentModel, CommentModelType } from "./CommentModel"
import { commentModelPrimitives, CommentModelSelector } from "./CommentModel.base"
import { PostModel, PostModelType } from "./PostModel"
import { postModelPrimitives, PostModelSelector } from "./PostModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { VoteModel, VoteModelType } from "./VoteModel"
import { voteModelPrimitives, VoteModelSelector } from "./VoteModel.base"



export type CommentInput = {
  postId: number
  body: string
}
export type CommentUpdateInput = {
  id: number
  body?: string
}
export type PostInput = {
  title: string
  body: string
}
export type PostUpdateInput = {
  id: number
  title?: string
  body?: string
}
export type VoteInput = {
  type: string
  postId?: number
  commentId?: number
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  comments: ObservableMap<string, CommentModelType>,
  posts: ObservableMap<string, PostModelType>,
  votes: ObservableMap<string, VoteModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryAllCommentsByUserId="queryAllCommentsByUserId",
queryAllComments="queryAllComments",
queryCommentById="queryCommentById",
queryAllCommentsForPostId="queryAllCommentsForPostId",
queryAllPosts="queryAllPosts",
queryPostById="queryPostById",
queryAllPostsForUserId="queryAllPostsForUserId",
queryAllVotes="queryAllVotes",
queryVoteById="queryVoteById",
queryAllVotesForCommentId="queryAllVotesForCommentId",
queryAllVotesForPostId="queryAllVotesForPostId",
queryAllVotesForUserId="queryAllVotesForUserId"
}
export enum RootStoreBaseMutations {
mutateCreateComment="mutateCreateComment",
mutateDeleteComment="mutateDeleteComment",
mutateUpdateComment="mutateUpdateComment",
mutateCreatePost="mutateCreatePost",
mutateDeletePost="mutateDeletePost",
mutateUpdatePost="mutateUpdatePost",
mutateCreateVote="mutateCreateVote",
mutateDeleteVote="mutateDeleteVote"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Comment', () => CommentModel], ['Post', () => PostModel], ['User', () => UserModel], ['Vote', () => VoteModel]], ['Comment', 'Post', 'Vote'], "js"))
  .props({
    comments: types.optional(types.map(types.late((): any => CommentModel)), {}),
    posts: types.optional(types.map(types.late((): any => PostModel)), {}),
    votes: types.optional(types.map(types.late((): any => VoteModel)), {})
  })
  .actions(self => ({
    queryAllCommentsByUserId(variables: { userId: string }, resultSelector: string | ((qb: CommentModelSelector) => CommentModelSelector) = commentModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allCommentsByUserId: CommentModelType[]}>(`query allCommentsByUserId($userId: String!) { allCommentsByUserId(userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllComments(variables?: {  }, resultSelector: string | ((qb: CommentModelSelector) => CommentModelSelector) = commentModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allComments: CommentModelType[]}>(`query allComments { allComments {
        ${typeof resultSelector === "function" ? resultSelector(new CommentModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryCommentById(variables: { commentId: number }, resultSelector: string | ((qb: CommentModelSelector) => CommentModelSelector) = commentModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ commentById: CommentModelType}>(`query commentById($commentId: Float!) { commentById(commentId: $commentId) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllCommentsForPostId(variables: { postId: number }, resultSelector: string | ((qb: CommentModelSelector) => CommentModelSelector) = commentModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allCommentsForPostId: CommentModelType[]}>(`query allCommentsForPostId($postId: Float!) { allCommentsForPostId(postId: $postId) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllPosts(variables?: {  }, resultSelector: string | ((qb: PostModelSelector) => PostModelSelector) = postModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allPosts: PostModelType[]}>(`query allPosts { allPosts {
        ${typeof resultSelector === "function" ? resultSelector(new PostModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryPostById(variables: { postId: number }, resultSelector: string | ((qb: PostModelSelector) => PostModelSelector) = postModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ postById: PostModelType}>(`query postById($postId: Float!) { postById(postId: $postId) {
        ${typeof resultSelector === "function" ? resultSelector(new PostModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllPostsForUserId(variables: { userId: string }, resultSelector: string | ((qb: PostModelSelector) => PostModelSelector) = postModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allPostsForUserId: PostModelType[]}>(`query allPostsForUserId($userId: String!) { allPostsForUserId(userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new PostModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllVotes(variables?: {  }, resultSelector: string | ((qb: VoteModelSelector) => VoteModelSelector) = voteModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allVotes: VoteModelType[]}>(`query allVotes { allVotes {
        ${typeof resultSelector === "function" ? resultSelector(new VoteModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryVoteById(variables: { voteId: number }, resultSelector: string | ((qb: VoteModelSelector) => VoteModelSelector) = voteModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ voteById: VoteModelType}>(`query voteById($voteId: Float!) { voteById(voteId: $voteId) {
        ${typeof resultSelector === "function" ? resultSelector(new VoteModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllVotesForCommentId(variables: { commentId: number }, resultSelector: string | ((qb: VoteModelSelector) => VoteModelSelector) = voteModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allVotesForCommentId: VoteModelType[]}>(`query allVotesForCommentId($commentId: Float!) { allVotesForCommentId(commentId: $commentId) {
        ${typeof resultSelector === "function" ? resultSelector(new VoteModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllVotesForPostId(variables: { postId: number }, resultSelector: string | ((qb: VoteModelSelector) => VoteModelSelector) = voteModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allVotesForPostId: VoteModelType[]}>(`query allVotesForPostId($postId: Float!) { allVotesForPostId(postId: $postId) {
        ${typeof resultSelector === "function" ? resultSelector(new VoteModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllVotesForUserId(variables: { userId: string }, resultSelector: string | ((qb: VoteModelSelector) => VoteModelSelector) = voteModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allVotesForUserId: VoteModelType[]}>(`query allVotesForUserId($userId: String!) { allVotesForUserId(userId: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new VoteModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateCreateComment(variables: { data: CommentInput }, resultSelector: string | ((qb: CommentModelSelector) => CommentModelSelector) = commentModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createComment: CommentModelType}>(`mutation createComment($data: CommentInput!) { createComment(data: $data) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteComment(variables: { id: number }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteComment: boolean }>(`mutation deleteComment($id: Float!) { deleteComment(id: $id) }`, variables, optimisticUpdate)
    },
    mutateUpdateComment(variables: { data: CommentUpdateInput }, resultSelector: string | ((qb: CommentModelSelector) => CommentModelSelector) = commentModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateComment: CommentModelType}>(`mutation updateComment($data: CommentUpdateInput!) { updateComment(data: $data) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreatePost(variables: { data: PostInput }, resultSelector: string | ((qb: PostModelSelector) => PostModelSelector) = postModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createPost: PostModelType}>(`mutation createPost($data: PostInput!) { createPost(data: $data) {
        ${typeof resultSelector === "function" ? resultSelector(new PostModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeletePost(variables: { id: number }, optimisticUpdate?: () => void) {
      return self.mutate<{ deletePost: boolean }>(`mutation deletePost($id: Float!) { deletePost(id: $id) }`, variables, optimisticUpdate)
    },
    mutateUpdatePost(variables: { data: PostUpdateInput }, resultSelector: string | ((qb: PostModelSelector) => PostModelSelector) = postModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updatePost: PostModelType}>(`mutation updatePost($data: PostUpdateInput!) { updatePost(data: $data) {
        ${typeof resultSelector === "function" ? resultSelector(new PostModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateVote(variables: { data: VoteInput }, resultSelector: string | ((qb: VoteModelSelector) => VoteModelSelector) = voteModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createVote: VoteModelType}>(`mutation createVote($data: VoteInput!) { createVote(data: $data) {
        ${typeof resultSelector === "function" ? resultSelector(new VoteModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteVote(variables: { id: number }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteVote: boolean }>(`mutation deleteVote($id: Float!) { deleteVote(id: $id) }`, variables, optimisticUpdate)
    },
  })))
