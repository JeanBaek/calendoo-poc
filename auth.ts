import NextAuth, {Session} from "next-auth"

import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

const config = {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    Google({
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          scope: [
            'openid',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/calendar',
          ].join(' '),
          response: 'code'
        }
      }
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      return !!auth;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000, // 3600 seconds 원래는 account.expires_at,
          refresh_token: account.refresh_token,
        }
      } else if (Date.now() < Number(token.expires_at)) {
        return token
      } else {
        console.log('Access token expired getting new one');
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID! as string,
              client_secret: process.env.AUTH_GOOGLE_SECRET! as string,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
            method: "POST",
          })

          const tokens = await response.json()

          if (!response.ok) throw tokens

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Date.now() + Number(tokens.expires_in) * 1000,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
        } catch (error) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const }
        }
      }
    },
    async session({ session, token }) {
      console.log('Incoming session info: ', session);

      // TODO: local test 용으로만 토큰을 클라이언트 쪽으로 보내고, production에서는 서버에서만 관리하도록 수정
      return {
        ...session,
        accessToken: String(token.access_token),
        refreshToken: String(token.refresh_token),
        accessTokenIssuedAt: Number(token.issued_at),
        accessTokenExpiresAt: Number(token.expires_at),
        // session.user = token.user as AdapterUser;
        // session.idToken = token.idToken as string;
        // session.error = token.error as Error;
      } satisfies EnrichedSession;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
  // user?: AdapterUser;
  // idToken?: string;
  // error?: Error;
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string
//   }
// }
