import * as LabelPrimitive from "@radix-ui/react-label";
import { motion } from "framer-motion";
import * as React from "react";
import { styled } from "stitches.config";
import Box from "./box";
import Flex from "./flex";

export const HelperText = styled(Box, {});

export const TextFieldLabel = styled(LabelPrimitive.Root, {
  width: "100%",
  position: "relative",
  display: "inline-block",
  paddingTop: "6px",
  fontSize: "$3",
  fontWeight: "normal",
  lineHeight: "150%",
  overflow: "hidden",
  "&:hover > input:not(:focus):placeholder-shown": {
    borderColor: "$gray"
  },
  "&:hover > textarea:not(:focus):placeholder-shown": {
    borderColor: "$gray"
  }
});

export const TextFieldInput = styled("input", {
  boxSizing: "border-box",
  margin: "0 0 $1",
  border: "solid 1px",
  borderColor: "$white",
  borderTopColor: "transparent",
  borderRadius: "4px",
  padding: "8px 16px",
  width: "100%",
  height: "inherit",
  color: "$white",
  backgroundColor: "$black",
  boxShadow: "none",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  caretColor: "$gray",
  transition: "border 0.2s, box-shadow 0.2s",

  "&:hover": {
    borderColor: "$gray",
    borderTopColor: "transparent"
  },

  "&:hover + span:before": {
    borderTopColor: "$gray"
  },
  "&:hover + span:after": {
    borderTopColor: "$gray"
  },

  "&:not(:focus):placeholder-shown": {
    borderTopColor: "$white"
  },

  "&:not(:focus):placeholder-shown + span": {
    fontSize: "inherit",
    lineHeight: "52px"
  },
  "&:not(:focus):placeholder-shown + span::before": {
    borderTopColor: "transparent"
  },
  "&:not(:focus):placeholder-shown + span::after": {
    borderTopColor: "transparent"
  },
  "&:focus": {
    borderColor: "$gray",
    borderTopColor: "transparent",
    boxShadow: "inset 1px 0 $gray, inset -1px 0 $gray, inset 0 -1px $gray",
    outline: "none"
  },
  "&:focus + span": {
    color: "$gray"
  },
  "&:focus + span::before": {
    borderTopColor: "$gray !important",
    boxShadow: "inset 0 1px $gray"
  },
  "&:focus + span::after": {
    borderTopColor: "$gray !important",
    boxShadow: "inset 0 1px $gray"
  },
  "&:disabled": {
    borderColor: "$gray !important",
    borderTopColor: "transparent !important",
    color: "$gray",
    pointerEvents: "none"
  },
  "&:disabled + span": {
    borderColor: "$gray !important",
    borderTopColor: "transparent !important",
    color: "$gray",
    pointerEvents: "none"
  },
  "&:disabled + span::before": {
    borderTopColor: "$gray !important"
  },
  "&:disabled + span::after": {
    borderTopColor: "$gray !important"
  },
  "&:placeholder-shown + span": {
    color: "$gray"
  },
  "&:disabled:placeholder-shown": {
    borderTopColor: "$gray !important"
  },
  "&:disabled:placeholder-shown + span": {
    borderTopColor: "$gray !important"
  },
  "&:disabled:placeholder-shown + span::before": {
    borderTopColor: "transparent !important"
  },
  "&:disabled:placeholder-shown + span::after": {
    borderTopColor: "transparent !important"
  }
});

export const TextFieldSpan = styled("span", {
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  borderColor: "$white",
  width: "100%",
  maxHeight: "100%",
  color: "$white",
  fontSize: "75%",
  lineHeight: "15px",
  cursor: "text",
  transition: "color 0.2s, font-size 0.2s, line-height 0.2s",
  "&:after": {
    content: "",
    display: "block",
    boxSizing: "border-box",
    marginTop: "6px",
    borderTop: "solid 1px",
    borderTopColor: "$white",
    minWidth: "10px",
    height: "8px",
    pointerEvents: "none",
    boxShadow: "inset 0 1px transparent",
    transition: "border-color 0.2s, box-shadow 0.2s",
    flexGrow: "1",
    marginLeft: "4px",
    borderRight: "solid 1px transparent",
    borderRadius: "0 4px"
  },
  "&:before": {
    content: "",
    display: "block",
    boxSizing: "border-box",
    marginTop: "6px",
    borderTop: "solid 1px",
    borderTopColor: "$white",
    minWidth: "10px",
    height: "8px",
    pointerEvents: "none",
    boxShadow: "inset 0 1px transparent",
    transition: "border-color 0.2s, box-shadow 0.2s",
    marginRight: "4px",
    borderLeft: "solid 1px transparent",
    borderRadius: "4px 0"
  }
});

type TextFieldProps = {
  label: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  error?: boolean;
  errorText?: string;
};

const TextField = React.forwardRef<React.ElementRef<"input">, TextFieldProps>(function TextField(
  props,
  ref
) {
  const {
    id = " ",
    label = "Label",
    error,
    helperText,
    placeholder,
    type = "text",
    ...other
  } = props;

  return (
    <Flex
      direction="column"
      css={{
        mb: "$4",
        width: "100%",
        display: type === "hidden" ? "none" : "flex"
      }}
    >
      <Box
        css={{
          position: "relative"
        }}
      >
        <TextFieldLabel htmlFor={id}>
          <TextFieldInput id={id} placeholder=" " type={type} ref={ref} {...other} />
          <TextFieldSpan>{label ?? placeholder}</TextFieldSpan>
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

export default TextField;
