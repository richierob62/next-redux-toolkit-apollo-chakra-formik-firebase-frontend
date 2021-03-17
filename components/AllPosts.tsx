import { selectFromPost, useQuery } from '../src/models';

import PostCard from './PostCard';
import React from 'react';
import { UnorderedList } from '@chakra-ui/react';
import { observer } from 'mobx-react';

const postSelector = selectFromPost()
  .id.body.numVotes.title.createdAt.user((u) => u.name)
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
            <PostCard key={post.id} post={post} />
          ))}
        </UnorderedList>
      )}
      {!data ? 'Loading...' : <button onClick={query!.refetch}>Refetch</button>}
    </>
  );
});

export default AllPosts;
