import { Prose } from "@/components/prose";
import { UserFeedbackForm } from "@/components/user/user-feedback-form";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export const runtime = "edge";

export const metadata = {
  title: "Feedback"
};

export default async function FeedbackPage() {
  const token = await getEdgeFriendlyToken();
  const user = await getUser(token.id);

  if (!user) {
    return redirect("/logout");
  }

  return (
    <div>
      <Prose>
        <h1>We appreciate all feedback</h1>
        <p>Good or bad, small or big.</p>
        <p>Help us make this app better for you.</p>
        <p>Thank you!</p>
      </Prose>
      <div className="w-full max-w-[320px]">
        <UserFeedbackForm user={user} />
      </div>
    </div>
  );
}
