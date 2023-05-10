import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminShell } from "@/app/admin/_components/admin-shell";
import { Button } from "@/components/ui/button";

export const runtime = "edge";

export default async function SettingsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Settings" text="Manage settings">
        <Button>Click</Button>
      </AdminHeader>
      <div>Settings..</div>
    </AdminShell>
  );
}
