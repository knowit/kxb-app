import * as PopoverPrimitive from "@radix-ui/react-popover";
import { keyframes, styled } from "stitches.config";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "translateY(0)" }
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-20px)" },
  "100%": { opacity: 1, transform: "translateX(0)" }
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-20px)" },
  "100%": { opacity: 1, transform: "translateY(0)" }
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(20px)" },
  "100%": { opacity: 1, transform: "translateX(0)" }
});

const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: "$gray"
});

const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: 4,
  padding: "$5",
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
  }
});

const StyledClose = styled(PopoverPrimitive.Close, {
  all: "unset",
  position: "absolute",
  top: 5,
  right: 5
});

// Exports
const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = StyledContent;
export const PopoverArrow = StyledArrow;
export const PopoverClose = StyledClose;

export default Popover;
