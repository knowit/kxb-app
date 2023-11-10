import { UserDialog } from "@/app/admin/@modal/_components/user-dialog";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface UserDialogPageProps {
  params: { id: string };
}


export default async function UserDialogPage({ params }: UserDialogPageProps) {
  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("id", "=", +params.id)
    .executeTakeFirst();

  if (!user) {
    return notFound();
  }

  return <UserDialog user={user} defaultOpen />;
}
