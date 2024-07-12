// src/types/next-auth.d.ts
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';

declare module 'next' {
  export type NextPageWithAuth<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    auth?: boolean;
  };

  export type AppPropsWithAuth = AppProps & {
    Component: NextPageWithAuth;
  };
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
