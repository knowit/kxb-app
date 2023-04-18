import { Icons } from "@/components/icons";
import { Flex } from "@/components/ui/flex";
import Link from "next/link";
import { type ReactNode } from "react";

export default async function JobOfferLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="border-b border-b-neutral-700">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <Link href="/dashboard">
            <Icons.Logo className="w-full max-w-[96px] lg:max-w-[140px]" />
          </Link>
        </div>
      </nav>
      <main className="dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl px-4 py-12 lg:py-24">{children}</div>
      </main>
      <footer className="border-t border-t-neutral-700">
        <div className="mx-auto max-w-5xl px-4 pb-24 pt-4 md:px-4 md:pt-8">
          <Flex className="px-0 pb-5 pt-10" justify="center">
            <Icons.Logo className="max-w-[140px]" />
          </Flex>
        </div>
      </footer>
    </>
  );
}
