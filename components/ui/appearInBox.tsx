import { WithChildren } from "@/types";
import { motion } from "framer-motion";
import * as React from "react";
import { CSS, styled, VariantProps } from "stitches.config";

const Box = styled(motion.div, {
  // Reset
  boxSizing: "border-box"
});

type AppearInBoxProps = VariantProps<typeof Box> &
  WithChildren<{
    appear: boolean;
    css?: CSS;
  }>;

const AppearInBox = React.forwardRef<React.ElementRef<typeof motion.div>, AppearInBoxProps>(
  ({ appear, ...other }, ref) => {
    return (
      <Box
        initial={appear ? "open" : "collapsed"}
        animate={appear ? "open" : "collapsed"}
        inherit={false}
        variants={{
          open: {
            opacity: 1,
            height: "auto"
          },
          collapsed: { opacity: 0, height: 0 }
        }}
        transition={{
          ease: "easeOut"
        }}
        {...other}
        ref={ref}
      />
    );
  }
);

AppearInBox.displayName = "AppearInBox";

export default AppearInBox;
