import { db, takeFirst } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { usersTable } from "../../../../lib/db/schema";

interface UserPageProps {
  params: { id: string };
}

export const runtime = "edge";

export default async function UserPage({ params }: UserPageProps) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, +params.id))
    .then(takeFirst);

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-1">
        <b>My name:</b>
        <span>{user.name}</span>
      </div>
    </div>
  );
}
