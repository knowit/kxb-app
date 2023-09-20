import { Avatar, AvatarSkeleton } from "@/app/dashboard/_components/avatar";
import { FeedbackForm } from "@/app/dashboard/_components/feedback-form";
import { Footer } from "@/app/dashboard/_components/footer";
import { NextPaycheck, NextPaycheckSkeleton } from "@/app/dashboard/_components/next-paycheck";
import { Icons } from "@/components/icons";
import { RefreshRSCOnFocus } from "@/components/refresh-rsc-on-focus";
import { UserFeedbackPopoverSkeleton } from "@/components/user/user-feedback-popover";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { UserHeartbeat, UserHeartbeatSkeleton } from "./_components/user-heartbeat";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const token = await getEdgeFriendlyToken();
  const user = await getUser(token.id);

  if (!user) {
    return redirect("/logout");
  }

  if (user.activeDirectoryId !== token.activeDirectoryId) {
    return redirect("/logout");
  }

  return (
    <>
      <main className="dark:bg-neutral-900">
        <nav className="border-b border-b-neutral-700 bg-neutral-950">
          <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/dashboard">
              <Icons.Logo className="w-full max-w-[96px] lg:max-w-[140px]" />
            </Link>
            <div className="flex items-center gap-8">
              <div className="hidden sm:block">
                <Suspense fallback={<UserFeedbackPopoverSkeleton />}>
                  <FeedbackForm asPopover />
                </Suspense>
              </div>
              <Suspense fallback={<NextPaycheckSkeleton />}>
                <NextPaycheck />
              </Suspense>
              <Suspense fallback={<AvatarSkeleton />}>
                <Avatar />
              </Suspense>
            </div>
          </div>
        </nav>
        <div className="mx-auto max-w-5xl px-4 py-12 lg:py-24">{children}</div>
        <Suspense fallback={<UserHeartbeatSkeleton />}>
          <UserHeartbeat />
        </Suspense>
        <Footer />
      </main>

      <RefreshRSCOnFocus />
    </>
  );
}
