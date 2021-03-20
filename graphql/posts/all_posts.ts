import { gql } from '@apollo/client';

export const allPosts = gql`
  query allPosts {
    allPosts {
      id
      title
      user {
        id
      }
      comments {
        id
        body
        numVotes
      }
      numVotes
    }
  }
`;
