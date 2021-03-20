// import PostCard from './PostCard';
// import React from 'react';
// import { UnorderedList } from '@chakra-ui/react';
import { observer } from 'mobx-react';

const AllPosts = observer(() => {
  return <div>Postcard List</div>;
  // return (
  //   <div>
  //     {data && (
  //       <UnorderedList mt="6" spacing={5} styleType="none" mb="6">
  //         {data.allPosts.map((post) => (
  //           <PostCard key={post.id} post={post} />
  //         ))}
  //       </UnorderedList>
  //     )}
  //     {!data ? 'Loading...' : <button onClick={query!.refetch}>Refetch</button>}
  //   </div>
  // );
});

export default AllPosts;
