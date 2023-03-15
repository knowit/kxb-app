import { Icons } from "@/components/icons";
import { UserAvatar } from "@/components/user/user-avatar";
import Link from "next/link";
import { Suspense } from "react";
import NextPaycheck from "./_components/next-paycheck";

export default function DashboardLayout({ children }) {
  return (
    <>
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Icons.Logo />
        </Link>
        <div className="flex gap-8">
          <Suspense fallback={<div></div>}>
            {/* @ts-expect-error Async Server Component */}
            <NextPaycheck />
          </Suspense>
          <UserAvatar />
        </div>
      </nav>
      <main className="mx-auto max-w-5xl">{children}</main>
    </>
  );
}
