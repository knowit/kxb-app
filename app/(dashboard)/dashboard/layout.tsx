import { Icons } from "@/components/icons";
import Link from "next/link";
import { Suspense } from "react";
import Avatar, { AvatarSkeleton } from "./_components/avatar";
import Footer from "./_components/footer";
import NextPaycheck from "./_components/next-paycheck";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-b-neutral-700 bg-black px-8 py-4">
        <Link href="/">
          <Icons.Logo />
        </Link>
        <div className="flex gap-8">
          <Suspense fallback={<div></div>}>
            {/* @ts-expect-error Async Server Component */}
            <NextPaycheck />
          </Suspense>
          <Suspense fallback={<AvatarSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <Avatar />
          </Suspense>
        </div>
      </nav>
      <main className="my-24 mx-auto max-w-5xl px-4">{children}</main>
      <Footer />
    </>
  );
}
