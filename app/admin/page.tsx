import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminShell } from "@/app/admin/_components/admin-shell";
import { Button } from "@/components/ui/button";

export const runtime = "experimental-edge";

export default async function AdminPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Posts" text="Create and manage posts.">
        <Button>Click</Button>
      </AdminHeader>
      <div>Admin dashboard</div>
    </AdminShell>
  );
}
