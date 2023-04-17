import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminShell } from "@/app/admin/_components/admin-shell";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function UsersPage() {
  const users = await db.selectFrom("user").selectAll().execute();

  return (
    <AdminShell>
      <AdminHeader heading="Users" text="Create and manage posts.">
        <Button>Click</Button>
      </AdminHeader>
      <div>
        {users.map(user => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </AdminShell>
  );
}
