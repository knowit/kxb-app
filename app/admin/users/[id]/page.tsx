import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: { id: string };
}

export const runtime = "experimental-edge";

export default async function UserPage({ params }: UserPageProps) {
  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("id", "=", +params.id)
    .executeTakeFirst();

  if (!user) {
    return notFound();
  }

  return <div>{user.name}</div>;
}
