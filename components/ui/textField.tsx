import * as React from "react";
import { css, styled } from "stitches.config";
import Box from "./box";
import ExpandingHelperText from "./expandingHelperText";
import FieldContainer from "./fieldContainer";
import Label from "./label";

export const HelperText = styled(Box, {});

export const defaultInputStyles = css({
  all: "unset",
  boxShadow: "0 0 0 2px $colors$grayLightest",
  borderRadius: "2px",
  padding: "$2 $3",
  transition: "box-shadow 0.2s ease-in-out",
  backgroundColor: "$black",
  [`+ ${Label}`]: {
    color: "$grayLightest",
    transition: "color 0.2s ease-in-out",
    order: -1
  },
  "&:hover": {
    boxShadow: "0 0 0 2px $colors$white",
    [`+ ${Label}`]: {
      color: "$white"
    }
  },
  "&:focus": {
    boxShadow: "0 0 0 2px $colors$white",
    [`+ ${Label}`]: {
      color: "$white"
    }
  }
});

export const TextFieldInput = styled("input", {
  ...defaultInputStyles
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
    <FieldContainer hidden={type === "hidden"}>
      <TextFieldInput id={id} type={type} ref={ref} {...other} />
      <Label
        htmlFor={id}
        css={{
          mb: "$1"
        }}
      >
        {label}
      </Label>
      <ExpandingHelperText expanded={error} text={helperText} />
    </FieldContainer>
  );
});

export default TextField;
