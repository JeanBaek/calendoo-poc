import type { NextAuthConfig } from 'next-auth';
import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const googleScopes = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/calendar',
];

const config = {
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          scope: googleScopes.join(' '),
          response: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.access_token) {
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000,
        };
      } else if (Date.now() < Number(token.expires_at)) {
        return token;
      } else {
        console.log('Access token expired getting new one');

        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID! as string,
              client_secret: process.env.AUTH_GOOGLE_SECRET! as string,
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token as string,
            }),
            method: 'POST',
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
            expires_at: Date.now() + Number(tokens.expires_in) * 1000,
          };
        } catch (error) {
          console.error('Error refreshing access token', error);

          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
    async session({ session, token }) {
      // TODO: local 에서만 토큰을 클라이언트로 보내고, production 에서는 오직 서버에서 관리하도록 수정
      return {
        ...session,
        accessToken: String(token.access_token),
        refreshToken: String(token.refresh_token),
        accessTokenIssuedAt: Number(token.issued_at),
        accessTokenExpiresAt: Number(token.expires_at),
      } satisfies EnrichedSession;
    },
    authorized({ request, auth }) {
      return !!auth;
    },
  },
  basePath: '/api/auth',
  theme: {
    logo: 'https://authjs.dev/img/logo-sm.png',
    brandColor: '#FF3131',
    colorScheme: 'auto',
  },
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}
