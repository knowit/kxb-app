import { UserSettingsFormSkeleton } from "@/components/user/user-settings-form";

export default function SettingsLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <UserSettingsFormSkeleton />
    </div>
  );
}
