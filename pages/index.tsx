import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import Container from '../components/Container';
import DisableableLink from '../components/DisableableLink';
import { userAuth } from '../auth';

const IndexPage = () => {
  const { user } = userAuth();

  return (
    <Container>
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" textAlign="center">
            Welcome!
          </Heading>
          <Text mt={8} textAlign="center">
            {`User ID: ${user ? user.uid : 'No one signed in'}`}
          </Text>
          <Stack
            mt={8}
            alignItems="center"
            justifyContent="center"
            isInline
            width="100%"
          >
            <Button
              variant="solid"
              colorScheme="blue"
              width="100%"
              isDisabled={!user}
            >
              <DisableableLink
                isDisabled={!user}
                label="Go to restricted area"
                href="/authenticated"
              />
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              width="100%"
              isDisabled={!!user}
            >
              <DisableableLink isDisabled={user} label="Log in" href="/login" />
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

export default IndexPage;
