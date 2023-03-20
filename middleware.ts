import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { SITE_CONSTANTS } from "./constants/site-constants";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/me", req.url));
      }

      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      // remove cookie
      const response = NextResponse.next();

      response.cookies.delete(SITE_CONSTANTS.COOKIE_KEY_ACTIVE_DIRECTORY_ID);

      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url));
    }

    if (isAuth) {
      const response = NextResponse.next();

      // Set a cookie
      response.cookies.set(SITE_CONSTANTS.COOKIE_KEY_ACTIVE_DIRECTORY_ID, token.activeDirectoryId);

      return response;
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      }
    }
  }
);

export const config = {
  matcher: ["/me/:path*", "/login", "/register"]
};
