import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Post } from '../../generated/apolloComponents';
import { RootState } from '../../store';
import { allPosts } from '../../graphql/posts/all_posts';
import { client } from '../../services';

interface PostState {
  posts: Post[];
  loading: boolean;
}

export const postsInitialState: PostState = { posts: [], loading: false };

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsInitialState,
  reducers: {
    postsStartLoad: (state) => {
      state.loading = true;
    },
    postsLoadSuccess: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
    },
  },
});

// thunk action creators
export const fetchPosts = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();

    if (isLoadingPosts(state)) return;

    dispatch(postsStartLoad());

    const { data } = await client.query({
      query: allPosts,
      fetchPolicy: 'network-only',
    });

    dispatch(postsLoadSuccess(data.allPosts));
  };
};

export const { postsLoadSuccess, postsStartLoad } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;
export const isLoadingPosts = (state: RootState) => state.posts.loading;

export default postsSlice.reducer;
