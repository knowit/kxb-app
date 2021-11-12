import { NextAuthSession, NextAuthSessionUser } from "@/types";

const userIsAdmin = (user: NextAuthSessionUser): boolean => user?.isAdmin ?? false;
const userIsSpecialist = (user: NextAuthSessionUser): boolean => user?.isSpecialist ?? false;

export const sessionUserIsAdmin = (session: NextAuthSession) => userIsAdmin(session?.user);
export const sessionUserIsSpecialist = (session: NextAuthSession) =>
  userIsSpecialist(session?.user);
export const getSessionUserActiveDirectoryId = (session: NextAuthSession) => session?.user?.id;
