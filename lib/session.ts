import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

async function getSession() {
  return await getServerSession(authOptions);
}

async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}

export { getSession, getCurrentUser };
