import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

// Temporary workaround for enabling NextAuth to work with Edge Functions
// Clean up when @auth/next is ready
const getEdgeFriendlyToken = cache(async () => {
  // @ts-ignore
  const req: NextRequest = {
    headers: headers(),
    cookies: cookies()
  };

  const token = await getToken({ req });

  if (!token) {
    return redirect("/logout");
  }

  return token;
});

export { getEdgeFriendlyToken };
