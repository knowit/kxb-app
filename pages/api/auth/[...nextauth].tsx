import prismaUser from "@/lib/prismaUser";
import { AzureAdTokenClaims } from "@/types";
import { fetchWithToken } from "@/utils/fetcher";
import jwt_decode from "jwt-decode";
import NextAuth, { Account, NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureAdProvider from "next-auth/providers/azure-ad";

const AZURE_AD_CLIENT_ID = process.env.NEXTAUTH_AZURE_AD_CLIENT_ID;
const AZURE_AD_TENANT_ID = process.env.NEXTAUTH_AZURE_AD_TENANT_ID;
const AZURE_AD_SECRET = process.env.NEXTAUTH_AZURE_AD_SECRET;
const AZURE_AD_SCOPE = "offline_access openid User.Read";

const AZURE_AD_ADMIN_GROUP_ID = process.env.AZURE_AD_ADMIN_GROUP_ID;
const AZURE_AD_SPECIALIST_GROUP_ID = process.env.AZURE_AD_SPECIALIST_GROUP_ID;

const getAzureAdTokenClaims = (token: string): AzureAdTokenClaims => {
  return jwt_decode(token) as AzureAdTokenClaims;
};

const accessToGroupId = (groups = [], groupId) => {
  if (groups === null || groups === undefined) {
    return false;
  }

  if (Array.isArray(groups) && !(groups.length > 0)) {
    return false;
  }

  if (groupId === null || groupId === undefined) {
    return false;
  }

  return groups.some(group => group?.id?.toLowerCase() === groupId.toLowerCase());
};

const accessToAdminGroup = groups => accessToGroupId(groups, AZURE_AD_ADMIN_GROUP_ID);
const accessToSpecialistGroup = groups => accessToGroupId(groups, AZURE_AD_SPECIALIST_GROUP_ID);

async function getUserRoles(token: string) {
  try {
    const { value: groups } = await fetchWithToken(
      "https://graph.microsoft.com/v1.0/me/memberOf?$select=displayName,id",
      token
    );

    const isSpecialist = accessToSpecialistGroup(groups);

    return {
      // To determine the admin role the user needs to have access
      // to the specialist and admin groups. Could revalidate this to
      // only requiring access to admin group in the future.
      isAdmin: isSpecialist && accessToAdminGroup(groups),
      isSpecialist
    };
  } catch (error) {
    console.error(error);

    // If group lookup somehow crashes then return false
    return {
      isAdmin: false,
      isSpecialist: false
    };
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/${AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const user = await prismaUser.getByActiveDirectoryId(token.sub);

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

    console.log("REFRESHY");

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    const { isAdmin, isSpecialist } = await getUserRoles(refreshedTokens.access_token);

    await prismaUser.update({
      data: {
        refreshToken: refreshedTokens.refresh_token,
        isAdmin: isAdmin ?? false,
        isSpecialist: isSpecialist ?? false,
        updated: new Date()
      },
      where: {
        id: user.id
      }
    });

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      isAdmin: isAdmin,
      isSpecialist: isSpecialist
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      isAdmin: token?.isAdmin ?? false,
      isSpecialist: token?.isAdmin ?? false,
      error: "RefreshAccessTokenError"
    };
  }
}

async function initialSignIn(
  account: Account & { accessToken?: string; refreshToken?: string; ext_expires_in?: number },
  user: User,
  token: JWT
) {
  const { isAdmin, isSpecialist } = await getUserRoles(account.access_token);

  await prismaUser.upsert({
    create: {
      name: user.name,
      email: user.email,
      activeDirectoryId: token.sub,
      refreshToken: account.refresh_token,
      isAdmin: isAdmin,
      isSpecialist: isSpecialist
    },
    update: {
      refreshToken: account.refresh_token,
      isAdmin: isAdmin,
      isSpecialist: isSpecialist
    },
    where: {
      activeDirectoryId: token.sub
    }
  });

  return {
    ...token,
    accessToken: account.access_token,
    accessTokenExpires: Date.now() + account?.ext_expires_in * 1000,
    isAdmin: isAdmin,
    isSpecialist: isSpecialist
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureAdProvider({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_SECRET,
      // scope: AZURE_AD_SCOPE,
      tenantId: AZURE_AD_TENANT_ID,
      profilePhotoSize: 48,
      authorization: {
        params: {
          scope: AZURE_AD_SCOPE
        }
      },
      // next-auth v4 used sub claim for user id, but we need to use the oid claim
      profile: async (profile, tokens) => {
        // Fetch user image
        // https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples
        const response = await fetch(`https://graph.microsoft.com/v1.0/me/photos/120x120/$value`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`
          }
        });

        const pictureBuffer = await response.arrayBuffer();
        const pictureBase64 = Buffer.from(pictureBuffer).toString("base64");

        const claims = getAzureAdTokenClaims(tokens.access_token);

        return {
          id: claims.oid,
          name: profile.name,
          email: profile.email,
          image: response.ok ? `data:image/jpeg;base64, ${pictureBase64}` : null
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in
      if (account && user) {
        return initialSignIn(account, user, token);
      }

      // If token exists and isSpecialist mark is not defined
      // refresh access token to add isSpecialist tag
      if (token && (token.isSpecialist === undefined || token.isSpecialist === null)) {
        return refreshAccessToken(token);
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token, user }) {
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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  }
};

export default NextAuth(authOptions);
