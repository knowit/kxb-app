import { keyframes, styled } from "stitches.config";

export const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" }
});

const Svg = styled("svg", {
  variants: {
    size: {
      1: {
        height: "$2",
        width: "$2"
      },
      2: {
        height: "$3",
        width: "$3"
      },
      3: {
        height: "$4",
        width: "$4"
      },
      4: {
        height: "$5",
        width: "$5"
      },
      5: {
        height: "$6",
        width: "$6"
      },
      6: {
        height: "$7",
        width: "$7"
      },
      7: {
        height: "$8",
        width: "$8"
      },
      8: {
        height: "$9",
        width: "$9"
      },
      9: {
        height: "$10",
        width: "$10"
      },
      10: {
        height: "$12",
        width: "$12"
      }
    },
    variant: {
      black: {
        color: "$black"
      },
      gray: {
        color: "$gray"
      },
      grayLight: {
        color: "$grayLight"
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
    spin: {
      true: {
        animation: `${spin} 1s linear infinite`
      }
    }
  },
  defaultVariants: {
    size: 3,
    variant: "black"
  }
});

export default Svg;
