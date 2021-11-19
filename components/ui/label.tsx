import * as LabelPrimitive from "@radix-ui/react-label";
import { styled } from "stitches.config";

const Label = styled(LabelPrimitive.Root, {
  fontSize: "$2",
  fontWeight: 400,
  color: "white",
  userSelect: "none"
});

export default Label;
