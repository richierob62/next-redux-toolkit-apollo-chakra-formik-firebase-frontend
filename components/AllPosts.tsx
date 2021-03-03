import { Badge, Box, ListItem, UnorderedList } from '@chakra-ui/react';
import { selectFromPost, useQuery } from '../src/models';

import React from 'react';
import { observer } from 'mobx-react';

const postSelector = selectFromPost()
  .id.body.numVotes.title.user((u) => u.name)
  .toString();

const AllPosts = observer(() => {
  const { error, data, query } = useQuery((store) => {
    return store.queryAllPosts({}, postSelector);
  });

  if (error) return error.message;
  if (!data) return 'Loading...';

  return (
    <>
      {data && (
        <UnorderedList mt="6" spacing={5} styleType="none" mb="6">
          {data.allPosts.map((post) => (
            <ListItem
              bg="gray.100"
              borderRadius="md"
              w="100%"
              boxShadow="md"
              p={5}
              color="gray.900"
              key={post.id}
            >
              <Box d="flex" justifyContent="space-between" alignItems="center">
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                  {post.title}
                </Box>
                <Box fontSize="sm" color="blue.400">
                  {post.user.name}
                </Box>
              </Box>

              <Box color="blue.400" fontSize="sm">
                {post.body}
              </Box>

              <Badge
                borderRadius="full"
                px="2"
                mt="4"
                colorScheme="orange"
                fontSize="xs"
              >
                {post.numVotes}
              </Badge>
            </ListItem>
          ))}
        </UnorderedList>
      )}
      {!data ? 'Loading...' : <button onClick={query!.refetch}>Refetch</button>}
    </>
  );
});

export default AllPosts;
