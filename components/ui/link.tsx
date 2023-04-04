import { Icons } from "@/components/icons";
import { Show } from "@/components/ui/show";
import { cn } from "@/lib/utils";
import NextLink from "next/link";
import * as React from "react";

type LinkElement = React.ElementRef<typeof NextLink>;
type LinkProps = React.ComponentPropsWithoutRef<typeof NextLink> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  showExternalLinkIcon?: boolean;
};

const Link = React.forwardRef<LinkElement, LinkProps>(
  ({ children, href, className, showExternalLinkIcon = true, ...other }, forwardedRef) => {
    const isHrefExternal = React.useMemo(() => {
      // server side rendering safe check for external links
      return /^https?:\/\//.test(href);
    }, [href]);

    const externalLinkProps = React.useMemo(() => {
      if (!isHrefExternal) {
        return {};
      }

      return {
        target: "_blank",
        rel: "noopener noreferrer"
      };
    }, [isHrefExternal]);

    return (
      <NextLink
        className={cn("", { "inline-flex items-center gap-1": isHrefExternal }, className)}
        href={href}
        ref={forwardedRef}
        {...externalLinkProps}
        {...other}
      >
        {children}
        <Show when={showExternalLinkIcon && isHrefExternal}>
          <Icons.ArrowTopRight className="h-4 w-4 opacity-50" />
        </Show>
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export { Link };
