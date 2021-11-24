import { css, styled } from "stitches.config";
import { pulse } from "./keyframes";

export const skeletonStyles = css({
  variants: {
    loading: {
      true: {
        backgroundColor: "$gray",
        position: "relative",
        overflow: "hidden",
        "&::after": {
          animationName: `${pulse}`,
          animationDuration: "1000ms",
          animationDirection: "alternate",
          animationIterationCount: "infinite",
          animationTimingFunction: "ease-in-out",
          backgroundColor: "$grayLight",
          borderRadius: "inherit",
          bottom: 0,
          content: '""',
          left: 0,
          position: "absolute",
          right: 0,
          top: 0
        },
        "> *": {
          visibility: "hidden"
        }
      }
    },
    variant: {
      avatar1: {
        borderRadius: "$round",
        height: "$3",
        width: "$3"
      },
      avatar2: {
        borderRadius: "$round",
        height: "$5",
        width: "$5"
      },
      avatar3: {
        borderRadius: "$round",
        height: "$6",
        width: "$6"
      },
      avatar4: {
        borderRadius: "$round",
        height: "$7",
        width: "$7"
      },
      avatar5: {
        borderRadius: "$round",
        height: "$8",
        width: "$8"
      },
      avatar6: {
        borderRadius: "$round",
        height: "$9",
        width: "$9"
      },
      text: {
        height: "$1"
      },
      title: {
        height: "$5"
      },
      heading: {
        height: "$3"
      },
      button: {
        borderRadius: "$1",
        height: "$5",
        width: "$8"
      },
      cartItem: {
        minHeight: "120px"
      },
      deliveryDateSelector: {
        minHeight: "64px"
      }
    }
  }
});

const Skeleton = styled("div", skeletonStyles);

export default Skeleton;
