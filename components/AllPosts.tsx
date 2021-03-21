import { IPost } from '../store';
import PostCard from './PostCard';
import React from 'react';
import { UnorderedList } from '@chakra-ui/react';
import { observer } from 'mobx-react';

const AllPosts = observer((props: { posts: IPost[] }) => {
  const { posts } = props;

  return (
    <div>
      {posts && (
        <UnorderedList mt="6" spacing={5} styleType="none" mb="6">
          {posts.map((post: IPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </UnorderedList>
      )}
    </div>
  );
});

export default AllPosts;
