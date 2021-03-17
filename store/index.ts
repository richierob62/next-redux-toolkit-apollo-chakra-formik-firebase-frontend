import { Instance, applySnapshot, onSnapshot, types } from 'mobx-state-tree';

import { Post } from '../generated/apolloComponents'

import { client } from '../services/my-service';
import { flow } from 'mobx';
import { model } from 'mobx-state-tree/dist/internal';
import { someNamedQuery } from '../queries/some-query';
import { useMemo } from 'react';

export type IStore = Instance<typeof MyStore>;


const MyStore = types
  .model('MyStore', {
    posts: types.array(Instance<typeof Post> ),
  })
  .views((self) => ({}))
  .actions((self) => {});

let startupValues = {
  posts: [],
};

const data = localStorage.getItem('rootState');
if (data) {
  const json = JSON.parse(data);
  if (MyStore.is(json)) {
    startupValues = json;
  }
}

let store: IStore | undefined;

export function initializeStore(snapshot = null) {
  const _store = store ?? MyStore.create(startupValues);

  onSnapshot(_store, (snapshot) => {
    localStorage.setItem('rootState', JSON.stringify(snapshot));
  });

  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  if (typeof window === 'undefined') return _store; // always create a new store from server
  if (!store) store = _store;

  return store;
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  return store;
}
