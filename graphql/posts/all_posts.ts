import { gql } from '@apollo/client';

export const allPosts = gql`
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
