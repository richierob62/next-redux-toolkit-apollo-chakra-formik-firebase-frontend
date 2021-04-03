import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

export { client, gql };
