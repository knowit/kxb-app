import { UserProfileForm } from "@/components/user/user-profile-form";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

async function ProfileForm() {
  const token = await getEdgeFriendlyToken();

  const user = await getUser(token.id);

  if (!user) {
    return redirect("/logout");
  }

  return <UserProfileForm user={user} />;
}

export { ProfileForm };
