import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import '../app/globals.css';
import { UserProvider } from 'components/UserProvider';
import type { AppPropsWithAuth } from '../types/next-auth.d';

function MyApp({ Component, pageProps }: AppPropsWithAuth) {
  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
