import { motion } from "framer-motion";
import * as React from "react";
import { styled } from "stitches.config";
import Box from "./box";

export const HelperText = styled(Box, {});

type ExpandingHelperTextProps = {
  expanded: boolean;
  text?: string;
};

const ExpandingHelperText = ({ text, expanded, ...other }: ExpandingHelperTextProps) => {
  return (
    <HelperText
      as={motion.div}
      initial={expanded ? "open" : "collapsed"}
      animate={expanded ? "open" : "collapsed"}
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
      css={{
        fontSize: "$2",
        margin: 0,
        color: "$red"
      }}
    >
      {expanded ? text : <div>&nbsp;</div>}
    </HelperText>
  );
};

export default ExpandingHelperText;
