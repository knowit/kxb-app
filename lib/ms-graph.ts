import { storageExists, storageUpload } from "@/lib/ms-storage";
import { cache } from "react";

const getMsGraphBearerToken = cache(async () => {
  const response = await fetch(
    `https://login.microsoftonline.com/${process.env.NEXTAUTH_AZURE_AD_TENANT_ID}/oauth2/v2.0/token`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: new URLSearchParams({
        grant_type: "password",
        username: process.env.MICROSOFT_GRAPH_USERNAME,
        password: process.env.MICROSOFT_GRAPH_PASSWORD,
        scope:
          "offline_access openid User.Read Group.Read.All GroupMember.Read.All Directory.Read.All",
        client_id: process.env.NEXTAUTH_AZURE_AD_CLIENT_ID
      })
    }
  );

  const data = (await response.json()) as { access_token: string; error_description: string };

  if (!response.ok) {
    throw new Error(data.error_description);
  }

  return data.access_token;
});

const getMsGraphUserAvatar = cache(async (activeDirectoryId: string) => {
  try {
    const exists = await storageExists(`${activeDirectoryId}.jpg`);

    if (exists.success) {
      return exists.url;
    }

    const token = await getMsGraphBearerToken();

    const response = await fetch(
      `https://graph.microsoft.com/v1.0/users/${activeDirectoryId}/photos/120x120/$value`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      return undefined;
    }

    const pictureBuffer = await response.arrayBuffer();

    await storageUpload(pictureBuffer, `${activeDirectoryId}.jpg`, "image/jpeg");

    return `data:image/jpeg;base64,${btoa(
      String.fromCharCode.apply(null, new Uint8Array(pictureBuffer))
    )}`;
  } catch (error) {
    console.error(error);
    return undefined;
  }
});

export { getMsGraphBearerToken, getMsGraphUserAvatar };
