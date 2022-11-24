import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { User } from ".";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"] &
      User & {
        image: string;
      };
    expires: ISODateString;
    accessToken: string;
    accessTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    name: string;
    email: string;
    picture: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
    dbUser?: Omit<User, "refreshToken">;
  }
}
