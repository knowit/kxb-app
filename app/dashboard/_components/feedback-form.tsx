import { UserFeedbackForm } from "@/components/user/user-feedback-form";
import { UserFeedbackPopover } from "@/components/user/user-feedback-popover";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function FeedbackForm({ asPopover = false }) {
  const token = await getEdgeFriendlyToken();

  const user = await getUser(token.id);

  if (!user) {
    return redirect("/logout");
  }

  return asPopover ? <UserFeedbackPopover user={user} /> : <UserFeedbackForm user={user} />;
}
