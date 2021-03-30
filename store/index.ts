import {
  Instance,
  applySnapshot,
  flow,
  onSnapshot,
  types,
} from 'mobx-state-tree';
import { Machine, interpret } from 'xstate';

import Post from './post';
import { allPosts } from '../graphql/posts/all_posts';
import { client } from '../services';
import { machineDefinition } from './state_machine';
import { useMemo } from 'react';

export type IStore = Instance<typeof MyStore>;

const MyStore = types
  .model('MyStore', {
    posts: types.array(Post),
    // machineDefinition: types.frozen(MachineConfig<UIContext, UIStateSchema, UIEvents>),
  })
  .views((self: any) => ({
    get state() {
      return self.ui_state.value;
    },
  }))
  .volatile((self: any) => ({
    ui_service: undefined,
    ui_state: undefined,
    machineDefinition,
  }))
  .actions((self: any) => ({
    getPosts: flow(function* () {
      console.log('getPosts was called');

      const { data } = yield client.query({
        query: allPosts,
        fetchPolicy: 'network-only',
      });

      if (data) {
        self.posts = data.allPosts;
      }
    }),
    showErrorMessage(context: any, event: any) {
      console.log(event.message);
    },
    afterCreate() {
      const machine = Machine(machineDefinition, {
        actions: {
          getPosts: self.getPosts,
          showErrorMessage: self.showErrorMessage,
        },
      });
      self.ui_service = interpret(machine);
      self.ui_service.onTransition(self.updateState);
      self.ui_service.start();
    },
    updateState() {
      self.ui_state = self.ui_service.state;
    },
    send(val: any) {
      self.ui_service.send(val);
    },
  }));

let startupValues = {
  posts: [],
  machineDefinition,
};

if (process.browser) {
  const data = localStorage.getItem('rootState');
  if (data) {
    const json = JSON.parse(data);
    if (MyStore.is(json)) {
      startupValues = json as any;
    }
  }
}

let store: IStore | undefined;

export function initializeStore(snapshot = null) {
  const _store = store ?? MyStore.create(startupValues);

  onSnapshot(_store, (snapshot) => {
    if (process.browser) {
      localStorage.setItem('rootState', JSON.stringify(snapshot));
    }
  });

  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  if (typeof window === 'undefined') return _store; // always create a new store from server
  if (!store) store = _store;

  return store;
}

export function getStore() {
  return store ? store : initializeStore();
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  return store;
}
