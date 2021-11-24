import { styled } from "stitches.config";
import Svg from "./svg";
import Text from "./text";

export const buttonProps = {
  // Reset
  all: "unset",
  alignItems: "center",
  boxSizing: "border-box",
  userSelect: "none",
  "&::before": {
    boxSizing: "border-box"
  },
  "&::after": {
    boxSizing: "border-box"
  },

  // Custom reset?
  display: "inline-flex",
  flexShrink: 0,
  justifyContent: "center",
  lineHeight: "1",
  letterSpacing: "normal",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  fontWeight: 400,
  // Custom
  cursor: "pointer",
  height: "$5",
  px: "$2",
  fontSize: "$3",
  transition: "all 0.2s ease-in-out",

  //   fontVariantNumeric: "tabular-nums",

  "&:disabled": {
    opacity: "0.6",
    cursor: "not-allowed",
    pointerEvents: "none"
  },

  variants: {
    size: {
      1: {
        borderRadius: "$2",
        height: "$5",
        px: "$2",
        fontSize: "$1",
        lineHeight: "$sizes$5"
      },
      2: {
        borderRadius: "$2",
        height: "$6",
        px: "$4",
        fontSize: "$3",
        lineHeight: "$sizes$6"
      },
      3: {
        borderRadius: "$2",
        height: "$7",
        px: "$4",
        fontSize: "$4",
        lineHeight: "$sizes$7"
      }
    },
    variant: {
      green: {
        backgroundColor: "$green",
        border: "2px solid $colors$green",
        color: "$black",
        [`${Text}`]: {
          color: "$black"
        },
        [`${Svg}`]: {
          color: "$black"
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "$greenDark",
            border: "2px solid $colors$greenDark"
          }
        },
        "&:active": {
          backgroundColor: "$green",
          border: "2px solid $colors$greenDark"
        },
        "&:focus": {
          backgroundColor: "$green",
          border: "2px solid $colors$greenDark"
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: "$grayLight",
            boxShadow: "inset 0 0 0 1px $grayLight"
          }
      },
      red: {
        backgroundColor: "$red",
        border: "2px solid $colors$red",
        color: "$black",
        [`${Text}`]: {
          color: "$black"
        },
        [`${Svg}`]: {
          color: "$black"
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "$redDark",
            border: "2px solid $colors$redDark"
          }
        },
        "&:active": {
          backgroundColor: "$red",
          border: "2px solid $colors$redDark"
        },
        "&:focus": {
          backgroundColor: "$red",
          border: "2px solid $colors$redDark"
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: "$grayLight",
            boxShadow: "inset 0 0 0 1px $grayLight"
          }
      },
      white: {
        backgroundColor: "$white",
        border: "2px solid $colors$white",
        color: "$black",
        [`${Text}`]: {
          color: "$black"
        },
        [`${Svg}`]: {
          color: "$black"
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "$white",
            border: "2px solid $colors$gray"
          }
        },
        "&:active": {
          backgroundColor: "$white",
          border: "2px solid $colors$grayDark"
        },
        "&:focus": {
          backgroundColor: "$white",
          border: "2px solid $colors$grayDark"
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: "$grayLight",
            boxShadow: "inset 0 0 0 1px $grayLight"
          }
      },
      black: {
        backgroundColor: "$black",
        border: "2px solid $colors$black",
        color: "$white",
        [`${Text}`]: {
          color: "$white"
        },
        [`${Svg}`]: {
          color: "$white"
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "$black",
            border: "2px solid $colors$grayDark"
          }
        },
        "&:active": {
          backgroundColor: "$black",
          border: "2px solid $colors$white"
        },
        "&:focus": {
          backgroundColor: "$black",
          border: "2px solid $colors$white"
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: "$grayLight",
            boxShadow: "inset 0 0 0 1px $grayLight"
          }
      },
      text: {
        backgroundColor: "transparent",
        border: "2px solid transparent",
        color: "$text",
        [`${Text}`]: {
          color: "$text"
        },
        [`${Svg}`]: {
          color: "$text"
        },
        "@hover": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "2px solid $colors$textDark"
          }
        },
        "&:active": {
          backgroundColor: "transparent",
          border: "2px solid $colors$text"
        },
        "&:focus": {
          backgroundColor: "transparent",
          border: "2px solid $colors$text"
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: "$grayLight",
            boxShadow: "inset 0 0 0 1px $grayLight"
          }
      }
    },

    state: {
      active: {
        backgroundColor: "$grayLight",
        boxShadow: "inset 0 0 0 1px $grayLight",
        color: "$grayLight",
        "@hover": {
          "&:hover": {
            backgroundColor: "$grayLight",
            boxShadow: "inset 0 0 0 1px $grayLight"
          }
        },
        "&:active": {
          backgroundColor: "$grayLight"
        },
        "&:focus": {
          boxShadow: "inset 0 0 0 1px $grayLight, 0 0 0 1px $grayLight"
        }
      },
      waiting: {
        backgroundColor: "$grayLight",
        boxShadow: "inset 0 0 0 1px $",
        color: "transparent",
        pointerEvents: "none",
        "@hover": {
          "&:hover": {
            backgroundColor: "$grayLight",
            boxShadow: "inset 0 0 0 1px $grayLight"
          }
        },
        "&:active": {
          backgroundColor: "$grayLight"
        },
        "&:focus": {
          boxShadow: "inset 0 0 0 1px $grayLight"
        }
      }
    },
    ghost: {
      true: {
        backgroundColor: "transparent",
        boxShadow: "none"
      }
    },
    fullWidth: {
      true: {
        width: "100%"
      }
    }
  },
  compoundVariants: [
    {
      ghost: true,
      variant: "green",
      css: {
        backgroundColor: "transparent",
        border: "2px solid transparent",
        color: "$green",
        "@hover": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "2px solid $colors$greenDark"
          }
        },
        "&:active": {
          backgroundColor: "transparent",
          border: "2px solid $colors$green"
        },
        "&:focus": {
          backgroundColor: "transparent",
          border: "2px solid $colors$green"
        }
      }
    },
    {
      ghost: true,
      variant: "red",
      css: {
        backgroundColor: "transparent",
        border: "2px solid transparent",
        color: "$red",
        "@hover": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "2px solid $colors$redDark"
          }
        },
        "&:active": {
          backgroundColor: "transparent",
          border: "2px solid $colors$red"
        },
        "&:focus": {
          backgroundColor: "transparent",
          border: "2px solid $colors$red"
        }
      }
    },
    {
      ghost: true,
      variant: "black",
      css: {
        backgroundColor: "transparent",
        border: "2px solid transparent",
        color: "$white",
        "@hover": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "2px solid $colors$grayLightest"
          }
        },
        "&:active": {
          backgroundColor: "transparent",
          border: "2px solid $colors$gray"
        },
        "&:focus": {
          backgroundColor: "transparent",
          border: "2px solid $colors$gray"
        }
      }
    }
  ],
  defaultVariants: {
    size: "2",
    variant: "green"
  }
};

const Button = styled("button", buttonProps);

export default Button;
