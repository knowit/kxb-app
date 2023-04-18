import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminShell } from "@/app/admin/_components/admin-shell";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Suspense } from "react";
import { AdminContent } from "../_components/admin-content";
import { UserCard } from "../_components/user/user-card";

export default async function UsersPage() {
  const users = await db.selectFrom("user").selectAll().orderBy("updated", "desc").execute();

  return (
    <AdminShell>
      <AdminHeader heading="Users" text="Create and manage users">
        <Button>Create</Button>
      </AdminHeader>
      <AdminContent>
        <div className="grid grid-cols-4 gap-3">
          {users.map(user => (
            <Suspense key={`suspense-${user.id}`} fallback={<div>loading...</div>}>
              {/* @ts-expect-error Async Server Component */}
              <UserCard key={`user-card-${user.id}`} user={user} />
            </Suspense>
          ))}
        </div>
      </AdminContent>
    </AdminShell>
  );
}
