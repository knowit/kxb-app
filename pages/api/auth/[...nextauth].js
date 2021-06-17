import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import redisUser from "../../../lib/redisUser";
import { fetchWithToken } from "../../../utils/fetcher";

const AZURE_AD_CLIENT_ID = process.env.NEXTAUTH_AZURE_AD_CLIENT_ID;
const AZURE_AD_TENANT_ID = process.env.NEXTAUTH_AZURE_AD_TENANT_ID;
const AZURE_AD_SECRET = process.env.NEXTAUTH_AZURE_AD_SECRET;
const AZURE_AD_SCOPE = "offline_access openid User.Read";

const AZURE_AD_ADMIN_GROUP_ID = process.env.AZURE_AD_ADMIN_GROUP_ID;
const AZURE_AD_SPECIALIST_GROUP_ID = process.env.AZURE_AD_SPECIALIST_GROUP_ID;

const accessToGroupId = (groups = [], groupId) => {
  if (groups === null || groups === undefined) {
    return false;
  }

  if (Array.isArray(groups) && !groups.length > 0) {
    return false;
  }

  if (groupId === null || groupId === undefined) {
    return false;
  }

  return groups.some(group => group?.id?.toLowerCase() === groupId.toLowerCase());
};

const accessToAdminGroup = groups => accessToGroupId(groups, AZURE_AD_ADMIN_GROUP_ID);
const accessToSpecialistGroup = groups => accessToGroupId(groups, AZURE_AD_SPECIALIST_GROUP_ID);

async function mutateUserWithRoles(user, token) {
  try {
    const { value: groups } = await fetchWithToken(
      "https://graph.microsoft.com/v1.0/me/memberOf?$select=displayName,id",
      token
    );

    const isSpecialist = accessToSpecialistGroup(groups);

    return {
      ...user,
      // To determine the admin role the user needs to have access
      // to the specialist and admin groups. Could revalidate this to
      // only requiring access to admin group in the future.
      isAdmin: isSpecialist && accessToAdminGroup(groups),
      isSpecialist
    };
  } catch (error) {
    console.error(error);

    // If group lookup somehow crashes then try to use
    // old values for user roles or default to false
    return {
      ...user,
      isAdmin: user?.isAdmin ?? false,
      isSpecialist: user?.isSpecialist ?? false
    };
  }
}

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

    const mutatedUser = await mutateUserWithRoles(user, refreshedTokens.access_token);

    await redisUser.update(user.id, {
      ...mutatedUser,
      refreshToken: refreshedTokens.refresh_token ?? mutatedUser.refreshToken
    });

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000
    };
  } catch (error) {
    console.error(error);

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
        const mutatedUser = await mutateUserWithRoles(user, account.accessToken);

        await redisUser.upsert(mutatedUser.id, {
          ...mutatedUser,
          refreshToken: account.refreshToken
        });

        return {
          ...token,
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account?.expires_in * 1000,
          isAdmin: mutatedUser.isAdmin,
          isSpecialist: mutatedUser.isSpecialist
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
          id: token.sub,
          isAdmin: token.isAdmin,
          isSpecialist: token.isSpecialist
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
