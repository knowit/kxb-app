import { UserSettingsForm } from "@/components/user/user-settings-form";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserSettings } from "@/lib/user";

async function SettingsForm() {
  const token = await getEdgeFriendlyToken();
  const userSettings = await getUserSettings(token.id);

  return <UserSettingsForm userSettings={userSettings} />;
}

export { SettingsForm };
