"use client";

export type Item = {
  text: string;
  slug?: string;
  segment?: string;
};

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { buttonVariants } from "./ui/button";

const TabNavigationItem = ({ path, item }: { path: string; item: Item }) => {
  const segment = useSelectedLayoutSegment();
  const href = item.slug ? path + "/" + item.slug : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  return (
    <Link href={href} className={buttonVariants({ variant: isActive ? "default" : "outline" })}>
      {item.text}
    </Link>
  );
};

const TabNavigation = ({ path, items }: { path: string; items: Item[] }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map(item => (
        <TabNavigationItem key={path + item.slug} item={item} path={path} />
      ))}
    </div>
  );
};

export { TabNavigation };
