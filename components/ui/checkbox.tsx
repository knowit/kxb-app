import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { styled } from "stitches.config";

const Checkbox = styled(CheckboxPrimitive.Root, {
  all: "unset",
  backgroundColor: "$main",
  width: "$4",
  height: "$4",
  borderRadius: "$2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `$input`,
  "&:hover": { boxShadow: "$inputHover" },
  "&:focus": { boxShadow: "$inputFocus" }
});

const CheckboxIndicator = styled(CheckboxPrimitive.Indicator, {
  color: "$secondary"
});

export { CheckboxIndicator };
export default Checkbox;
