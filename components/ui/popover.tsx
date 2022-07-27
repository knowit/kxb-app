import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import type { CSS, VariantProps } from "stitches.config";
import { styled } from "stitches.config";
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from "./keyframes";

const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: "$gray",

  variants: {
    variant: {
      gray: {
        fill: "$grayLightest"
      }
    }
  }
});

const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: "$2",
  padding: "$4",
  maxWidth: 360,
  backgroundColor: "$main",
  boxShadow: "0 0 0 1px $colors$gray",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade }
    }
  },
  "&:focus": {
    boxShadow: "0 0 0 1px $colors$grayLightest",
    [`${StyledArrow}`]: {
      fill: "$grayLightest"
    }
  },
  variants: {
    variant: {
      gray: {
        backgroundColor: "$grayDark",
        boxShadow: "0 0 0 1px $colors$grayLightest"
      }
    },
    size: {
      1: {
        maxWidth: "200px"
      },
      2: {
        maxWidth: "280px"
      },
      3: {
        maxWidth: "360px"
      }
    }
  }
});

const StyledClose = styled(PopoverPrimitive.Close, {
  all: "unset",
  position: "absolute",
  top: 5,
  right: 5
});

type PopoverContentPrimitiveProps = React.ComponentProps<typeof PopoverPrimitive.Content>;
type PopoverContentProps = PopoverContentPrimitiveProps &
  VariantProps<typeof StyledContent> & {
    portal?: boolean;
    css?: CSS;
  };

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  PopoverContentProps
>(({ children, portal = false, ...other }, forwardedRef) => {
  const PopoverWrapper = portal ? PopoverPrimitive.Portal : React.Fragment;

  return (
    <PopoverWrapper>
      <StyledContent {...other} ref={forwardedRef}>
        {children}
      </StyledContent>
    </PopoverWrapper>
  );
});

PopoverContent.displayName = "PopoverContent";

// Exports
const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverArrow = StyledArrow;
export const PopoverClose = StyledClose;

export default Popover;
