import { WithChildren } from "@/types";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { CSS, styled } from "stitches.config";

const LinkRoot = styled("a", {
  color: "$text",

  variants: {
    active: {
      true: {
        color: "$green"
      }
    }
  }
});

type LinkProps = WithChildren<{
  href: string;
  as?: string;
  onClick?: React.MouseEventHandler;
  isExternal?: boolean;
  css?: CSS;
}> &
  NextLinkProps;

const Link = ({ children, href, as, isExternal = false, ...other }: LinkProps) => {
  const router = useRouter();
  const path = router.asPath ?? router.pathname;
  const linkPath = as ?? href;

  const linkProps =
    as !== null && as !== undefined
      ? {
          href,
          as,
          passHref: true
        }
      : {
          href,
          passHref: true
        };

  const active = React.useMemo(
    () => linkPath !== "/" && (path === linkPath || path.startsWith(linkPath)),
    [path, linkPath]
  );

  if (isExternal) {
    return (
      <LinkRoot href={href} {...other}>
        {children}
      </LinkRoot>
    );
  }

  return (
    <NextLink {...linkProps}>
      <LinkRoot active={active} {...other}>
        {children}
      </LinkRoot>
    </NextLink>
  );
};

export default Link;
