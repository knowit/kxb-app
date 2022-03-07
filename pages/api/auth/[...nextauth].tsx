import prismaUser from "@/lib/prismaUser";
import { validateEmail } from "@/logic/validationLogic";
import type { User as PrismaUser } from "@/types";
import { AzureAdTokenClaims, GraphUser } from "@/types";
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

const getUserEmail = async (accessToken: string): Promise<string> => {
  const claims = getAzureAdTokenClaims(accessToken);

  // If claims contains unique principal name then use that
  if (claims.upn && validateEmail(claims.upn)) {
    return claims.upn;
  }

  // Fetch user profile from graph and retrieve email
  const response = await fetch(`https://graph.microsoft.com/v1.0/me/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user email");
  }

  const user: GraphUser = await response.json();

  return user.mail ?? user.userPrincipalName;
};

const getUserImage = async (accessToken: string): Promise<string | null> => {
  // Fetch user image
  // https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples
  const response = await fetch(`https://graph.microsoft.com/v1.0/me/photos/120x120/$value`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    return null;
  }

  const pictureBuffer = await response.arrayBuffer();
  const pictureBase64 = Buffer.from(pictureBuffer).toString("base64");

  return `data:image/jpeg;base64, ${pictureBase64}`;
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

async function handleToken(token: JWT) {
  const dbUser = await prismaUser.getByActiveDirectoryId(token.sub);

  if (Date.now() < new Date(dbUser.accessTokenExpires ?? 0).getTime()) {
    return {
      ...token,
      dbUser
    };
  }

  const refreshedToken = refreshAccessToken(token, dbUser);

  return {
    ...refreshedToken,
    dbUser
  };
}

async function refreshAccessToken(token: JWT, user: PrismaUser) {
  try {
    const url = `https://login.microsoftonline.com/${AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

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

    const { isAdmin, isSpecialist } = await getUserRoles(refreshedTokens.access_token);

    await prismaUser.update({
      data: {
        refreshToken: refreshedTokens.refresh_token,
        accessTokenExpires: Date.now() + refreshedTokens?.ext_expires_in * 1000,
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
      accessToken: refreshedTokens.access_token
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
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
      accessTokenExpires: Date.now() + account?.ext_expires_in * 1000,
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
    ...token
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
      idToken: true,
      checks: "state",
      // next-auth v4 used sub claim for user id, but we need to use the oid claim
      profile: async (profile, tokens) => {
        // Fetch user image
        // https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples

        const claims = getAzureAdTokenClaims(tokens.access_token);
        const image = await getUserImage(tokens.access_token);

        return {
          id: claims.oid,
          name:
            profile.name ??
            claims?.name ??
            `${claims?.given_name}${claims?.family_name ? ` ${claims?.family_name}` : ""}`,
          email: profile.email ?? (await getUserEmail(tokens.access_token)),
          image: image
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

      return handleToken(token);
    },
    async session({ session, token, user }) {
      const dbUser = (token?.dbUser as PrismaUser) ?? ({} as PrismaUser);
      // Add property to session, like an access_token from a provider.
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          ...dbUser
        },
        accessToken: token.accessToken as string,
        accessTokenExpires: token.accessTokenExpires as number
      };
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  }
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: PrismaUser & {
      image: string;
    };
    expires: Date;
    accessToken: string;
    accessTokenExpires: number;
  }
}

export default NextAuth(authOptions);
