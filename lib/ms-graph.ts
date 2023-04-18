import { cache } from "react";

const getMsGraphBearerToken = cache(async () => {
  const response = await fetch(
    `https://login.microsoftonline.com/${process.env.NEXTAUTH_AZURE_AD_TENANT_ID}/oauth2/v2.0/token`,
    {
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

const getMsGraphUserAvatar = cache(async (id: string) => {
  const token = await getMsGraphBearerToken();

  try {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/users/${id}/photos/240x240/$value`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const pictureBuffer = await response.arrayBuffer();

    return `data:image/jpeg;base64,${btoa(
      String.fromCharCode.apply(null, new Uint8Array(pictureBuffer))
    )}`;
  } catch (error) {
    return undefined;
  }
});

export { getMsGraphBearerToken, getMsGraphUserAvatar };
