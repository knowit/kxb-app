import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: { id: string };
}


export default async function UserPage({ params }: UserPageProps) {
  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("id", "=", +params.id)
    .executeTakeFirst();

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
