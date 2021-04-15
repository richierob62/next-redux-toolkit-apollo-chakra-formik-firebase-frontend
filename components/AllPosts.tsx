import { Box, UnorderedList } from '@chakra-ui/react';

import FormTester from './FormTester';
import { Post } from '../generated/apolloComponents';
import PostCard from './PostCard';
import React from 'react';
import { selectPosts } from '../store/slices/postsSlice';
import { useSelector } from 'react-redux';

const AllPosts = () => {
  const posts = useSelector(selectPosts);

  return (
    <Box>
      <FormTester />
      {posts && (
        <UnorderedList mt="6" spacing={5} styleType="none" mb="6">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </UnorderedList>
      )}
    </Box>
  );
};

export default AllPosts;
