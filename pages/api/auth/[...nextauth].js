import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import redisUser from "../../../lib/redisUser";

const AZURE_AD_CLIENT_ID = process.env.NEXTAUTH_AZURE_AD_CLIENT_ID;
const AZURE_AD_TENANT_ID = process.env.NEXTAUTH_AZURE_AD_TENANT_ID;
const AZURE_AD_SECRET = process.env.NEXTAUTH_AZURE_AD_SECRET;
const AZURE_AD_SCOPE = "offline_access openid";

async function refreshAccessToken(token) {
  try {
    const url = `https://login.microsoftonline.com/${AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const user = await redisUser.getById(token.sub);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: new URLSearchParams({
        client_id: AZURE_AD_CLIENT_ID,
        client_secret: AZURE_AD_SECRET,
        grant_type: "refresh_token",
        refresh_token: user.refreshToken,
        scope: AZURE_AD_SCOPE
      })
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    await redisUser.update(user.id, {
      refreshToken: refreshedTokens.refresh_token ?? user.refreshToken
    });

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError"
    };
  }
}

export default NextAuth({
  providers: [
    Providers.AzureADB2C({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_SECRET,
      scope: AZURE_AD_SCOPE,
      tenantId: AZURE_AD_TENANT_ID
    })
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // Initial sign in
      if (account && user) {
        await redisUser.upsert(user.id, { ...user, refreshToken: account.refreshToken });

        return {
          ...token,
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account?.expires_in * 1000
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session(session, token) {
      // Add property to session, like an access_token from a provider.
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub
        },
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires
      };
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  pages: {
    signIn: "/login"
  }
});
