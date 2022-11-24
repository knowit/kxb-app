import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const AZURE_AD_CLIENT_ID = process.env.NEXTAUTH_AZURE_AD_CLIENT_ID;
const AZURE_AD_TENANT_ID = process.env.NEXTAUTH_AZURE_AD_TENANT_ID;
const AZURE_AD_SECRET = process.env.NEXTAUTH_AZURE_AD_SECRET;
const AZURE_AD_SCOPE = "offline_access openid User.Read";

export default async function Avatar(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const { refreshToken } = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        refreshToken: true
      }
    });

    if (!refreshToken) {
      return res.status(404).end();
    }

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
        refresh_token: refreshToken,
        scope: AZURE_AD_SCOPE
      })
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      return res.status(404).end();
    }

    await prisma.user.update({
      data: {
        refreshToken: refreshedTokens.refresh_token,
        accessTokenExpires: Date.now() + refreshedTokens?.ext_expires_in * 1000,
        updated: new Date()
      },
      where: {
        id: session.user.id
      }
    });

    const avatarResponse = await fetch(
      `https://graph.microsoft.com/v1.0/me/photos/120x120/$value`,
      {
        headers: {
          Authorization: `Bearer ${refreshedTokens.access_token}`
        }
      }
    );

    if (!avatarResponse.ok) {
      return res.status(404).end();
    }

    const pictureBuffer = await avatarResponse.arrayBuffer();

    return res.status(200).json({
      src: `data:image/jpeg;base64,${Buffer.from(pictureBuffer).toString("base64")}`
    });
  }

  return res.send("Method not allowed.");
}
