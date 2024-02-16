import { db } from "@/lib/db";
import { validateEmail } from "@/logic/validation-logic";
import { AzureAdTokenClaims, GraphUser } from "@/types";
import { getMySQLDate } from "@/utils/date-utils";
import { fetchWithToken } from "@/utils/fetcher";
import { jwtDecode } from "jwt-decode";
import { Account, NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureAdProvider from "next-auth/providers/azure-ad";

const AZURE_AD_CLIENT_ID = process.env.NEXTAUTH_AZURE_AD_CLIENT_ID;
const AZURE_AD_TENANT_ID = process.env.NEXTAUTH_AZURE_AD_TENANT_ID;
const AZURE_AD_SECRET = process.env.NEXTAUTH_AZURE_AD_SECRET;
const AZURE_AD_SCOPE = "offline_access openid User.Read";

const AZURE_AD_ADMIN_GROUP_ID = process.env.AZURE_AD_ADMIN_GROUP_ID;
const AZURE_AD_SPECIALIST_GROUP_ID = process.env.AZURE_AD_SPECIALIST_GROUP_ID;

const getAzureAdTokenClaims = (token: string): AzureAdTokenClaims => {
  return jwtDecode(token) as AzureAdTokenClaims;
};

const getUserEmail = async (accessToken: string): Promise<string> => {
  const claims = getAzureAdTokenClaims(accessToken);

  // If claims contains unique principal name then use that
  if (claims.upn && validateEmail(claims.upn)) {
    return claims.upn;
  }

  // If claims contains unique_name then use that
  if (claims.unique_name && validateEmail(claims.unique_name)) {
    return claims.unique_name;
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

const accessToGroupId = (groups: { id: string }[] = [], groupId: string) => {
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

async function initialSignIn(
  account: Account & { accessToken?: string; refreshToken?: string; ext_expires_in?: number },
  user: User,
  token: JWT
): Promise<void> {
  if (
    !account?.access_token ||
    !token?.sub ||
    !user?.email ||
    !user?.name ||
    !account?.ext_expires_in
  ) {
    return;
  }

  const { isAdmin, isSpecialist } = await getUserRoles(account.access_token);

  const dbUser = await db
    .selectFrom("user")
    .select("id")
    .where("activeDirectoryId", "=", token.sub)
    .executeTakeFirst();

  if (dbUser) {
    await db
      .updateTable("user")
      .set({
        refreshToken: account.refresh_token,
        isAdmin,
        isSpecialist,
        updated: getMySQLDate()
      })
      .where("id", "=", dbUser.id)
      .executeTakeFirst();

    return;
  }

  await db
    .insertInto("user")
    .values({
      // name: user.name,
      email: "",
      activeDirectoryId: token.sub,
      refreshToken: account.refresh_token,
      accessTokenExpires: Date.now() + account?.ext_expires_in * 1000,
      isAdmin,
      isSpecialist
    })
    .executeTakeFirst();
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // max age 90 days
    maxAge: 90 * 24 * 60 * 60
  },
  jwt: {
    // max age 90 days
    maxAge: 90 * 24 * 60 * 60
  },
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
        if (!tokens?.access_token) {
          return profile;
        }

        // Fetch user image
        // https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples

        const claims = getAzureAdTokenClaims(tokens.access_token);

        return {
          id: claims.oid,
          name:
            profile.name ??
            claims?.name ??
            `${claims?.given_name}${claims?.family_name ? ` ${claims?.family_name}` : ""}`,
          email: profile.email ?? (await getUserEmail(tokens.access_token))
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in
      // Create or update user in database
      if (account && user) {
        await initialSignIn(account, user, token);
      }

      // The user should exist in the database at this point
      // after initial sign in
      const dbUser = await db
        .selectFrom("user")
        .select(["id", "isAdmin", "isSpecialist", "activeDirectoryId"])
        .where("activeDirectoryId", "=", token.sub ?? "unknown")
        .executeTakeFirst();

      // throw if user is not found in database
      if (!dbUser) {
        throw new Error("User not found in database");
      }

      return {
        ...token,
        id: dbUser.id,
        email: token.email,
        name: token.name,
        isAdmin: dbUser.isAdmin,
        isSpecialist: dbUser.isSpecialist,
        activeDirectoryId: dbUser.activeDirectoryId
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
        session.user.isSpecialist = token.isSpecialist;
        session.user.activeDirectoryId = token.activeDirectoryId;
      }

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  }
};
