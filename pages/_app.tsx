import { CSSReset, ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../auth';

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <ChakraProvider>
      <CSSReset />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
