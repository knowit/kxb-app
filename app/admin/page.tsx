import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminShell } from "@/app/admin/_components/admin-shell";
import { Button } from "@/components/ui/button";
import { AdminContent } from "./_components/admin-content";

export default async function AdminPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Dashboard" text="Admin overview">
        <Button>Click</Button>
      </AdminHeader>
      <AdminContent>Admin dashboard</AdminContent>
    </AdminShell>
  );
}
