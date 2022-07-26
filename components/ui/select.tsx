import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import type { CSS, VariantProps } from "stitches.config";
import { styled } from "stitches.config";

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 13,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: "panel",
  color: "$text",
  cursor: "pointer",
  boxShadow: `$select`,
  "&:hover": { boxShadow: "$selectHover" },
  "&:focus": { boxShadow: `$select` }
});

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: "hidden",
  backgroundColor: "$panel",
  borderRadius: 6,
  boxShadow: "$select"
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: 5
});

const StyledItem = styled(SelectPrimitive.Item, {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "$text",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 35px 0 25px",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    color: "$gray",
    pointerEvents: "none"
  },

  "&:focus": {
    backgroundColor: "$grayLightest",
    color: "$grayDark"
  }
});

const StyledLabel = styled(SelectPrimitive.Label, {
  padding: "0 25px",
  fontSize: 12,
  lineHeight: "25px",
  color: "$textDark"
});

const StyledSeparator = styled(SelectPrimitive.Separator, {
  height: 1,
  backgroundColor: "$gray",
  margin: 5
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
});

const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  backgroundColor: "white",
  color: "$text",
  cursor: "default"
};

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonStyles);

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton, scrollButtonStyles);

type SelectContentPrimitiveProps = React.ComponentProps<typeof SelectPrimitive.Content>;
type SelectContentProps = SelectContentPrimitiveProps &
  VariantProps<typeof StyledContent> & {
    css?: CSS;
  };

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  SelectContentProps
>(({ children, ...other }, forwardedRef) => (
  <SelectPrimitive.Portal>
    <StyledContent {...other} ref={forwardedRef}>
      {children}
    </StyledContent>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = "SelectContent";

export const Select = SelectPrimitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectIcon = SelectPrimitive.Icon;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = SelectPrimitive.ItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = StyledLabel;
export const SelectSeparator = StyledSeparator;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;
