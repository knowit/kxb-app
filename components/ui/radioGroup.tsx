import { WithChildren } from "@/types";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
import { CSS, styled, VariantProps } from "stitches.config";

const StyledRadioGroupRadio = styled(RadioGroupPrimitive.Item, {
  all: "unset",
  backgroundColor: "white",
  width: 25,
  height: 25,
  borderRadius: "100%",
  boxShadow: `0 2px 10px $colors$black`,
  "&:hover": { backgroundColor: "$gray" },
  "&:focus": { boxShadow: `0 0 0 2px $black` }
});

const RadioGroupIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: "$black"
  }
});

type RadioGroupRadioProps = VariantProps<typeof StyledRadioGroupRadio> &
  WithChildren<{
    id: string;
    value: string;
    css?: CSS;
  }>;

const RadioGroupRadio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupRadioProps
>(function RadioGroupRadio({ id, value, ...other }, ref) {
  return <StyledRadioGroupRadio id={id} value={value} ref={ref} {...other} />;
});

const RadioGroup = RadioGroupPrimitive.Root;

export { RadioGroupIndicator, RadioGroupRadio };
export default RadioGroup;
