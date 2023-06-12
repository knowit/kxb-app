import { SettingsForm } from "@/app/dashboard/_components/settings-form";
import { UserSettingsFormSkeleton } from "@/components/user/user-settings-form";
import { Suspense } from "react";

export const runtime = "edge";

export const metadata = {
  title: "Settings"
};

export default async function SettingsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Suspense fallback={<UserSettingsFormSkeleton />}>
        <SettingsForm />
      </Suspense>
    </div>
  );
}
