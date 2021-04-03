import { Box, UnorderedList } from '@chakra-ui/react';

import { Post } from '../generated/apolloComponents';
import PostCard from './PostCard';
import React from 'react';
import { postsSelector } from '../store/slices/postsSlice';
// import { useAppSelector } from '../store/hooks'
import { useSelector } from 'react-redux';

const AllPosts = () => {
  const posts = useSelector(postsSelector);

  // const dispatch = useAppDispatch()

  return (
    <Box>
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
