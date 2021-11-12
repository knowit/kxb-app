import { motion } from "framer-motion";
import * as React from "react";
import { styled } from "stitches.config";
import Box from "./box";
import Flex from "./flex";
import { HelperText, TextFieldInput, TextFieldLabel, TextFieldSpan } from "./textField";

const TextAreaRoot = styled(TextFieldInput, {
  variants: {
    variant: {
      vertical: {
        resize: "vertical"
      },
      horizontal: {
        resize: "horizontal"
      },
      "no-resize": {
        resize: "none"
      }
    }
  },

  defaultVariants: {
    variant: "vertical"
  }
});

type TextFieldProps = {
  label: string;
  helperText?: string;
  disabled?: boolean;
  id?: string;
  error?: boolean;
  errorText?: string;
  rows?: number;
};

const TextArea = React.forwardRef<React.ElementRef<"textarea">, TextFieldProps>(function TextArea(
  props,
  ref
) {
  const { id = " ", label = "Label", error, helperText, rows = 4, ...other } = props;

  return (
    <Flex
      direction="column"
      css={{
        mb: "$4",
        width: "100%"
      }}
    >
      <Box
        css={{
          position: "relative"
        }}
      >
        <TextFieldLabel htmlFor={id}>
          <TextAreaRoot as="textarea" id={id} placeholder=" " ref={ref} rows={rows} {...other} />
          <TextFieldSpan>{label}</TextFieldSpan>
        </TextFieldLabel>
      </Box>
      <HelperText
        as={motion.div}
        initial={error ? "open" : "collapsed"}
        animate={error ? "open" : "collapsed"}
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
        {error ? helperText : <div>&nbsp;</div>}
      </HelperText>
    </Flex>
  );
});

export default TextArea;
