import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import { ModelCreationType, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { RootStore, RootStoreType, StoreContext } from '../src/models';
import { createHttpClient, getDataFromTree } from 'mst-gql';

import App from 'next/app';
import { AuthProvider } from '../auth';

const isServer: boolean = !process.browser;

let store: ModelCreationType<RootStoreType>;

export function getStore(snapshot = null): ModelCreationType<RootStoreType> {
  if (isServer || !store) {
    store = RootStore.create(undefined, {
      gqlHttpClient: createHttpClient('http://localhost:3001/graphql'),
      ssr: isServer,
    });
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return store;
}

export default class MyApp extends App<any, any> {
  store: ModelCreationType<RootStoreType>;

  static async getInitialProps({
    Component,
    ctx,
    router,
  }: {
    Component: any;
    ctx: any;
    router: any;
  }) {
    const store = getStore();

    const pageProps =
      (Component.getInitialProps &&
        (await Component.getInitialProps({ ...ctx, store }))) ||
      {};

    let storeSnapshot;
    if (isServer) {
      const tree = <MyApp {...{ Component, router, pageProps, store }} />;
      await getDataFromTree(tree, store);
      storeSnapshot = getSnapshot<RootStoreType>(store);
    }

    return { pageProps, storeSnapshot };
  }

  constructor(props: any) {
    super(props);
    this.store = props.store || getStore(props.storeSnapshot);
    Object.assign(global, { store: this.store }); // for debugging
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <StoreContext.Provider value={this.store}>
        <ChakraProvider>
          <CSSReset />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ChakraProvider>
      </StoreContext.Provider>
    );
  }
}
