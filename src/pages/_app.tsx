// src/pages/_app.tsx
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import '../app/globals.css';
import type { AppPropsWithAuth } from '../types/next-auth.d';

function MyApp({ Component, pageProps }: AppPropsWithAuth) {
  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ChakraProvider>
  );
}

function Auth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/'); // Redirect if not authenticated
  }, [session, status, router]);

  if (session) {
    return <>{children}</>;
  }

  return <p>Loading...</p>;
}

export default MyApp;
