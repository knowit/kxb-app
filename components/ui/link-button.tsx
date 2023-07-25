"use client";

import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LinkButton = ({
  children,
  className,
  variant = "outline",
  size = "default",
  href,
  disabled = false
}: ButtonProps & { href: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);

  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }), {
        "pointer-events-none opacity-50": disabled
      })}
      href={href}
      onClick={e => {
        e.preventDefault();
        router.push(href);
      }}
    >
      {children}
    </Link>
  );
};

export { LinkButton };
