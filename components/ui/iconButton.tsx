import { styled } from "stitches.config";

const IconButton = styled("button", {
  // Reset
  alignItems: "center",
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  display: "inline-flex",
  flexShrink: 0,
  fontFamily: "inherit",
  fontSize: "14px",
  justifyContent: "center",
  lineHeight: "1",
  outline: "none",
  padding: "0",
  textDecoration: "none",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  cursor: "pointer",
  color: "$black",
  "&::before": {
    boxSizing: "border-box"
  },
  "&::after": {
    boxSizing: "border-box"
  },
  backgroundColor: "$transparent",
  border: "1px solid $transparent",

  "@hover": {
    "&:hover": {
      borderColor: "$grayLight"
    }
  },
  "&:active": {
    backgroundColor: "$grayLight"
  },
  "&:focus": {
    borderColor: "$grayLight",
    boxShadow: "0 0 0 1px $colors$grayLight"
  },
  "&:disabled": {
    pointerEvents: "none",
    backgroundColor: "transparent",
    color: "$grayLight"
  },

  variants: {
    variant: {
      ghost: {
        backgroundColor: "transparent"
      }
    },
    size: {
      1: {
        borderRadius: "$2",
        height: "$5",
        width: "$5"
      },
      2: {
        borderRadius: "$2",
        height: "$6",
        width: "$6"
      },
      3: {
        borderRadius: "$2",
        height: "$7",
        width: "$7"
      },
      4: {
        borderRadius: "$3",
        height: "$8",
        width: "$8"
      }
    },
    round: {
      true: {
        borderRadius: "$pill"
      }
    }
  },
  defaultVariants: {
    size: "1"
  }
});

export default IconButton;
