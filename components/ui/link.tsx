import { WithChildren } from "@/types";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { CSS, styled, VariantProps } from "stitches.config";

const LinkRoot = styled("a", {
  textDecoration: "none",
  transition: "color 0.2s ease-in-out",
  color: "$textDark",
  "&:hover": {
    color: "$text"
  },

  variants: {
    variant: {
      full: {
        display: "block",
        width: "100%"
      }
    },
    color: {
      text: {
        color: "$text"
      },
      textDark: {
        color: "$textDark"
      },
      black: {
        color: "$black"
      },
      gray: {
        color: "$gray"
      },
      grayLight: {
        color: "$grayLight"
      },
      grayLighter: {
        color: "$grayLighter"
      },
      grayLightest: {
        color: "$grayLightest"
      },
      green: {
        color: "$green"
      },
      red: {
        color: "$red"
      },
      white: {
        color: "$white"
      }
    },
    textDecoration: {
      underline: {
        textDecoration: "underline"
      }
    },
    active: {
      true: {
        color: "$green"
      }
    }
  }
});

type LinkProps = VariantProps<typeof LinkRoot> &
  WithChildren<{
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
      <LinkRoot href={href} target="_blank" rel="noreferrer" {...other}>
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
