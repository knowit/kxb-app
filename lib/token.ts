import { getToken, JWT } from "next-auth/jwt";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies, headers } from "next/headers";
import { cache } from "react";

// Temporary workaround for enabling NextAuth to work with Edge Functions
// Clean up when @auth/next is ready
const getEdgeFriendlyToken = cache(async (): Promise<JWT | null> => {
  // @ts-ignore
  const req: NextRequest = {
    headers: headers(),
    cookies: cookies() as RequestCookies
  };

  const token = await getToken({ req });

  return token;
});

export { getEdgeFriendlyToken };
