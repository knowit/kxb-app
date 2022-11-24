import Link from "next/link";
import * as React from "react";
import { CSS, styled } from "stitches.config";
import { buttonStyles } from "./button";

const StyledLinkButton = styled("a", buttonStyles);

type LinkButtonPrimitiveProps = React.ComponentProps<typeof StyledLinkButton>;
type LinkButtonProps = LinkButtonPrimitiveProps & { href: string; css?: CSS };

export const LinkButton = ({ children, href, ...props }: LinkButtonProps) => {
  return (
    <Link href={href} legacyBehavior passHref>
      <StyledLinkButton {...props}>{children}</StyledLinkButton>
    </Link>
  );
};

LinkButton.displayName = "LinkButton";

export default LinkButton;
