import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

export default function Link({ children, href, as, className, NextLinkProps = {}, ...other }) {
  const router = useRouter();
  const path = router.asPath ?? router.pathname;
  const linkPath = as ?? href;

  const linkProps =
    as !== null && as !== undefined
      ? {
          href,
          as,
          passHref: true,
          ...NextLinkProps
        }
      : {
          href,
          passHref: true,
          ...NextLinkProps
        };

  const active = React.useMemo(
    () => linkPath !== "/" && (path === linkPath || path.startsWith(linkPath)),
    [path, linkPath]
  );

  return (
    <NextLink {...linkProps}>
      <a
        className={clsx(
          {
            "text-gray-900 dark:text-gray-100": !active,
            "text-green-800 dark:text-green-400": active
          },
          className
        )}
        {...other}
      >
        {children}
      </a>
    </NextLink>
  );
}
