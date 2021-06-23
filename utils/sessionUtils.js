import { userIsAdmin, userIsSpecialist } from "@/utils/userUtils";

export const sessionUserIsAdmin = session => userIsAdmin(session?.user);
export const sessionUserIsSpecialist = session => userIsSpecialist(session?.user);
export const getSessionUserId = session => session?.user?.id;
