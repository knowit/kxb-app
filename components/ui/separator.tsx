import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { styled } from "stitches.config";

const Separator = styled(SeparatorPrimitive.Root, {
  backgroundColor: "$gray",
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 },

  variants: {
    space: {
      1: {
        "&[data-orientation=horizontal]": { my: "$1" },
        "&[data-orientation=vertical]": { mx: "$1" }
      },
      2: {
        "&[data-orientation=horizontal]": { my: "$2" },
        "&[data-orientation=vertical]": { mx: "$2" }
      },
      3: {
        "&[data-orientation=horizontal]": { my: "$3" },
        "&[data-orientation=vertical]": { mx: "$3" }
      },
      4: {
        "&[data-orientation=horizontal]": { my: "$4" },
        "&[data-orientation=vertical]": { mx: "$4" }
      },
      5: {
        "&[data-orientation=horizontal]": { my: "$5" },
        "&[data-orientation=vertical]": { mx: "$5" }
      },
      6: {
        "&[data-orientation=horizontal]": { my: "$6" },
        "&[data-orientation=vertical]": { mx: "$6" }
      }
    }
  }
});

export default Separator;
