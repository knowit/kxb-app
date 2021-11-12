import { styled } from "stitches.config";

const Container = styled("div", {
  // Reset
  boxSizing: "border-box",
  flexShrink: 0,

  variants: {
    size: {
      1: {
        maxWidth: "$smContainer"
      },
      2: {
        maxWidth: "$mdContainer"
      },
      3: {
        maxWidth: "$lgContainer"
      },
      4: {
        maxWidth: "none"
      }
    },
    center: {
      true: {
        margin: "0 auto"
      }
    }
  },
  defaultVariants: {
    size: "4"
  }
});

export default Container;
