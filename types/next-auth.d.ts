import { User } from "next-auth";
import "next-auth/jwt";

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    isAdmin: boolean;
    isSpecialist: boolean;
    activeDirectoryId: string;
    commission: number;
    hourlyRate: number;
    tax: number;
    workHours: number;
  }
}
  
declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      isAdmin: boolean;
      isSpecialist: boolean;
      activeDirectoryId: string;
      commission: number;
      hourlyRate: number;
      tax: number;
      workHours: number;
    }
  }
}
