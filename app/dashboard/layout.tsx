import { Icons } from "@/components/icons";
import Link from "next/link";
import { Suspense } from "react";
import Avatar, { AvatarSkeleton } from "./_components/avatar";
import Footer from "./_components/footer";
import NextPaycheck, { NextPaycheckSkeleton } from "./_components/next-paycheck";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-b-neutral-700 px-8 py-4">
        <Link href="/">
          <Icons.Logo className="w-full max-w-[96px] lg:max-w-[140px]" />
        </Link>
        <div className="flex gap-8">
          <Suspense fallback={<NextPaycheckSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <NextPaycheck />
          </Suspense>
          <Suspense fallback={<AvatarSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <Avatar />
          </Suspense>
        </div>
      </nav>
      <main className="dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl py-12 px-4 lg:py-24">{children}</div>
      </main>
      <Footer />
    </>
  );
}
