import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Post } from '../../generated/apolloComponents';
import { RootState } from '../../store';

interface PostState {
  posts: Post[];
}

export const postsInitialState: PostState = { posts: [] };

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsInitialState,
  reducers: {
    loadPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { loadPosts } = postsSlice.actions;

export const postsSelector = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
