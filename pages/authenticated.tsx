import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import { NextPageContext } from 'next';
import firebase from 'firebase/app';
import firebaseClient from '../firebaseClient';
import nookies from 'nookies';
import { verifyIdToken } from '../firebaseAdmin';

const Authenticated = (props: any) => {
  firebaseClient();

  if (props.email) {
    return (
      <Flex>
        <Stack mx="auto">
          <Box w={500} p={4} my={12} mx="auto">
            <Heading as="h2" textAlign="center">
              Authenticated
            </Heading>
            <Stack mt={10}>
              {Object.keys(props).map((ele) => {
                const data =
                  typeof props[ele] === 'object'
                    ? JSON.stringify(props[ele], null, 2)
                    : props[ele];

                return <Text key={ele}>{`${ele}: ${data}`}</Text>;
              })}
            </Stack>
          </Box>
          <Box w={500} p={4} my={12} mx="auto">
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
          </Box>
        </Stack>
      </Flex>
    );
  } else {
    <Box>
      <Text>Loading</Text>
    </Box>;
  }
};

export async function getServerSideProps(context: Partial<NextPageContext>) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return {
      props: {
        ...token,
      },
    };
  } catch (err) {
    context.res!.writeHead(302, { location: '/login' });
    context.res!.end();
    return { props: null };
  }
}

export default Authenticated;
