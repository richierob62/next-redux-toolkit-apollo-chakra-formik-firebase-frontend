import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  type: Scalars['String'];
  post?: Maybe<Post>;
  comment?: Maybe<Comment>;
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  email_verified: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  posts: Array<Post>;
  votes: Array<Vote>;
  comments: Array<Comment>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  user: User;
  comments: Array<Comment>;
  votes: Array<Vote>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  numVotes: Scalars['Float'];
};


export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  body: Scalars['String'];
  post: Post;
  user: User;
  votes: Array<Vote>;
  numVotes: Scalars['Float'];
};

export type PostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type PostUpdateInput = {
  id: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type CommentInput = {
  postId: Scalars['Float'];
  body: Scalars['String'];
};

export type CommentUpdateInput = {
  id: Scalars['Float'];
  body?: Maybe<Scalars['String']>;
};

export type VoteInput = {
  type: Scalars['String'];
  postId?: Maybe<Scalars['Float']>;
  commentId?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  allCommentsByUserId: Array<Comment>;
  allComments: Array<Comment>;
  commentById: Comment;
  allCommentsForPostId: Array<Comment>;
  allPosts: Array<Post>;
  postById: Post;
  allPostsForUserId: Array<Post>;
  allVotes: Array<Vote>;
  voteById: Vote;
  allVotesForCommentId: Array<Vote>;
  allVotesForPostId: Array<Vote>;
  allVotesForUserId: Array<Vote>;
};


export type QueryAllCommentsByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryCommentByIdArgs = {
  commentId: Scalars['Float'];
};


export type QueryAllCommentsForPostIdArgs = {
  postId: Scalars['Float'];
};


export type QueryPostByIdArgs = {
  postId: Scalars['Float'];
};


export type QueryAllPostsForUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryVoteByIdArgs = {
  voteId: Scalars['Float'];
};


export type QueryAllVotesForCommentIdArgs = {
  commentId: Scalars['Float'];
};


export type QueryAllVotesForPostIdArgs = {
  postId: Scalars['Float'];
};


export type QueryAllVotesForUserIdArgs = {
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  updateComment: Comment;
  createPost: Post;
  deletePost: Scalars['Boolean'];
  updatePost: Post;
  createVote: Vote;
  deleteVote: Scalars['Boolean'];
};


export type MutationCreateCommentArgs = {
  data: CommentInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateCommentArgs = {
  data: CommentUpdateInput;
};


export type MutationCreatePostArgs = {
  data: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationUpdatePostArgs = {
  data: PostUpdateInput;
};


export type MutationCreateVoteArgs = {
  data: VoteInput;
};


export type MutationDeleteVoteArgs = {
  id: Scalars['Float'];
};

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { allPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'numVotes' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'email_verified' | 'name' | 'firstName' | 'lastName' | 'fullName'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'body' | 'numVotes'>
    )> }
  )> }
);


export const AllPostsDocument = gql`
    query allPosts {
  allPosts {
    id
    title
    body
    user {
      id
      email
      email_verified
      name
      firstName
      lastName
      fullName
    }
    comments {
      id
      body
      numVotes
    }
    numVotes
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;