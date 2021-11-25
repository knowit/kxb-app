import * as React from "react";
import { CSS, css, styled, VariantProps } from "stitches.config";
import Box from "./box";
import ExpandingHelperText from "./expandingHelperText";
import FieldContainer from "./fieldContainer";
import Label from "./label";

export const HelperText = styled(Box, {});

export const defaultInputStyles = css({
  all: "unset",
  boxShadow: "$input",
  borderRadius: "2px",
  padding: "$2 $3",
  transition: "box-shadow 0.2s ease-in-out",
  backgroundColor: "$main",
  [`+ ${Label}`]: {
    color: "$textDark",
    transition: "color 0.2s ease-in-out",
    order: -1
  },
  "&:hover": {
    boxShadow: "$inputHover",
    [`+ ${Label}`]: {
      color: "$text"
    }
  },
  "&:focus": {
    boxShadow: "$inputFocus",
    [`+ ${Label}`]: {
      color: "$text"
    }
  },
  "&:disabled": {
    backgroundColor: "$grayDark",
    cursor: "not-allowed"
  }
});

const TextFieldInput = styled("input", {
  ...defaultInputStyles
});

type LabelSizeVariants = Pick<VariantProps<typeof Label>, "size">;

type TextFieldLabelSizeVariants = "tiny" | "1" | "2" | "3" | "4";

type TextFieldProps = {
  label: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string | number;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  error?: boolean;
  errorText?: string;
  step?: string;
  min?: string;
  css?: CSS;
  fieldContainerCss?: CSS;
  labelSize?: TextFieldLabelSizeVariants;
};

const TextField = React.forwardRef<React.ElementRef<"input">, TextFieldProps>(function TextField(
  props,
  ref
) {
  const {
    id,
    label = "Label",
    error = true,
    helperText,
    placeholder,
    type = "text",
    step,
    min,
    fieldContainerCss,
    labelSize,
    ...other
  } = props;

  return (
    <FieldContainer hidden={type === "hidden"} css={fieldContainerCss}>
      <TextFieldInput
        id={id}
        type={type}
        placeholder={placeholder}
        step={step}
        min={min}
        ref={ref}
        {...other}
      />
      <Label
        htmlFor={id}
        size={labelSize}
        textTransform="uppercase"
        css={{
          mb: "$2"
        }}
      >
        {label}
      </Label>
      <ExpandingHelperText expanded={error} text={helperText} />
    </FieldContainer>
  );
});

export default TextField;
