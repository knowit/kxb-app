import { WithChildren } from "@/types";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";
import { CSS, styled, VariantProps } from "stitches.config";
import { Svg } from ".";

const DEFAULT_TAG = "div";

const StyledAlert = styled(DEFAULT_TAG, {
  // Reset
  boxSizing: "border-box",
  "&::before": {
    boxSizing: "border-box"
  },
  "&::after": {
    boxSizing: "border-box"
  },

  display: "flex",
  gap: "$3",
  borderRadius: "$2",
  backgroundColor: "$main",
  variants: {
    variant: {
      info: {
        boxShadow: "$alertInfo"
      },
      success: {
        boxShadow: "$alertSuccess"
      },
      warning: {
        boxShadow: "$alertWarning"
      },
      error: {
        boxShadow: "$alertError"
      }
    },
    padding: {
      small: {
        padding: "$3"
      },
      medium: {
        padding: "$4"
      },
      large: {
        padding: "$6"
      },
      xl: {
        padding: "$8"
      }
    }
  },
  defaultVariants: {
    variant: "info",
    padding: "small"
  }
});

type AlertVariants = "info" | "success" | "warning" | "error";
type SvgVariants = Pick<VariantProps<typeof Svg>, "variant">;
type AlertProps = Omit<VariantProps<typeof StyledAlert>, "variant"> &
  WithChildren<{ variant?: AlertVariants; css?: CSS }>;

const Alert = React.forwardRef<React.ElementRef<typeof DEFAULT_TAG>, AlertProps>(function Alert(
  { children, variant = "info", ...other },
  ref
) {
  const svgVariant: Record<AlertVariants, SvgVariants["variant"]> = {
    info: { "@initial": "text" },
    success: { "@initial": "green" },
    warning: { "@initial": "red" },
    error: { "@initial": "red" }
  };

  return (
    <StyledAlert variant={variant} {...other} ref={ref}>
      <Svg as={HiInformationCircle} variant={svgVariant[variant]} />
      {children}
    </StyledAlert>
  );
});

Alert.displayName = "Alert";

Alert.toString = () => `.${StyledAlert.className}`;

export default Alert;
