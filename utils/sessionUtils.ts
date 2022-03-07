import { Session } from "next-auth";

const userIsAdmin = (user: Session["user"]): boolean => user?.isAdmin ?? false;
const userIsSpecialist = (user: Session["user"]): boolean => user?.isSpecialist ?? false;

export const sessionUserIsAdmin = (session: Session) => userIsAdmin(session?.user);
export const sessionUserIsSpecialist = (session: Session) => userIsSpecialist(session?.user);
export const getSessionUserActiveDirectoryId = (session: Session) =>
  session?.user?.activeDirectoryId;
