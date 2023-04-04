import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

async function getSession() {
  return await getServerSession(authOptions);
}

async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}

export { getSession, getCurrentUser };
