import { Box, Button, Heading, Text } from '@chakra-ui/react';

import AllPosts from '../components/AllPosts';
import { NextPageContext } from 'next';
import React from 'react';
import { allPosts } from '../graphql/posts/all_posts';
import { client } from '../services';
import firebase from 'firebase/app';
import firebaseClient from '../auth/firebaseClient';
import { initializeStore } from '../store';
import { loadPosts } from '../store/slices/postsSlice';
import nookies from 'nookies';
import { verifyIdToken } from '../auth/firebaseAdmin';

const Authenticated = (props: any) => {
  firebaseClient();

  return (
    <Box w={1000} p={4} my={12} mx="auto">
      <Heading as="h2" size="lg" width="100%" textAlign="center">
        All Posts
      </Heading>
      <AllPosts />

      <Button
        w="100%"
        variant="solid"
        colorScheme="red"
        onClick={async () => {
          await firebase.auth().signOut();
          window.location.href = '/';
        }}
      >
        Sign Out
      </Button>

      <Text fontSize="sm" color="tomato">{`Logged in as ${props.name}`}</Text>
    </Box>
  );
};

export async function getServerSideProps(context: Partial<NextPageContext>) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);

    // get store & dispatch
    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;

    const { data } = await client.query({
      query: allPosts,
      fetchPolicy: 'network-only',
    });

    dispatch(loadPosts(data.allPosts));

    return {
      props: {
        ...token,
        initialReduxState: reduxStore.getState(),
      },
    };
  } catch (err) {
    context.res!.writeHead(302, { location: '/login' });
    context.res!.end();
    return { props: null };
  }
}

export default Authenticated;
