import { Box, Flex, Spacer, UnorderedList } from '@chakra-ui/react';

import { IPost } from '../store/post';
import PostCard from './PostCard';
import React from 'react';
import { getStore } from '../store';
import { observer } from 'mobx-react';

const AllPosts = observer((props: { posts: IPost[] }) => {
  const { posts: postsFromSSR } = props;
  const store = getStore();

  const { posts: postsFromStore } = store;

  return (
    <Flex>
      <Box flex="6">
        {postsFromSSR && (
          <UnorderedList mt="6" spacing={5} styleType="none" mb="6">
            {postsFromSSR.map((post: IPost) => (
              <PostCard key={post.id} post={post} />
            ))}
          </UnorderedList>
        )}
      </Box>
      <Spacer flex="1" />
      <Box flex="6">
        {postsFromStore && (
          <UnorderedList mt="6" spacing={5} styleType="none" mb="6">
            {postsFromStore.map((post: IPost) => (
              <PostCard key={post.id} post={post} />
            ))}
          </UnorderedList>
        )}
      </Box>
    </Flex>
  );
});

export default AllPosts;
