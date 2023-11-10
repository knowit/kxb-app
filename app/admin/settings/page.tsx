import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminShell } from "@/app/admin/_components/admin-shell";
import { Button } from "@/components/ui/button";
import { AdminContent } from "../_components/admin-content";


export default async function SettingsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Settings" text="Manage settings">
        <Button>Click</Button>
      </AdminHeader>
      <AdminContent>Settings..</AdminContent>
    </AdminShell>
  );
}
