import { CSSReset, ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../auth/auth';
import { Provider } from 'react-redux';
import { useStore } from '../store';

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <CSSReset />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}
