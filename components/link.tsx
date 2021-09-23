import clsx from "clsx";
import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

interface Props extends LinkProps {
  href: string;
  as?: string;
  className?: string;
  onClick?: React.MouseEventHandler;
}

const Link: React.FC<Props> = ({ children, href, as, className, ...other }) => {
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
};

export default Link;
