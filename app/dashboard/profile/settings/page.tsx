import { UserSettingsFormSkeleton } from "@/components/user/user-settings-form";
import { Suspense } from "react";
import SettingsForm from "../../_components/settings-form";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata = {
  title: "Settings"
};

export default async function SettingsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Suspense fallback={<UserSettingsFormSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <SettingsForm />
      </Suspense>
    </div>
  );
}
