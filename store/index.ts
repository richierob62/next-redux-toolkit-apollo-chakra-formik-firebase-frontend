import postsReducer, { postsInitialState } from './slices/postsSlice';

import { configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let store: any;

const initialState = {
  posts: postsInitialState,
};

function initStore(preloadedState: RootState = initialState) {
  return configureStore({
    reducer: {
      posts: postsReducer,
    },
    preloadedState,
  });
}

export const initializeStore = (preloadedState: RootState = initialState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
