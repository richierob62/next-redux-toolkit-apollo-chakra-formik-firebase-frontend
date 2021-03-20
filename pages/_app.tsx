import { CSSReset, ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../auth';
import { Provider as MSTProvider } from 'mobx-react';
import { useStore } from '../store';

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  const store = useStore(pageProps.initialState);

  return (
    <MSTProvider store={store}>
      <ChakraProvider>
        <CSSReset />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </MSTProvider>
  );
}
