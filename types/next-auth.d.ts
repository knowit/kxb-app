import "next-auth";
import "next-auth/jwt";

type UserId = number;

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name?: string;
    email: string;
    isAdmin: boolean;
    isSpecialist: boolean;
    activeDirectoryId: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string;
      email: string;
      isAdmin: boolean;
      isSpecialist: boolean;
      activeDirectoryId: string;
    };
  }
}
