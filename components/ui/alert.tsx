import { WithChildren } from "@/types";
import React from "react";
import { IconType } from "react-icons";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline,
  IoWarningOutline
} from "react-icons/io5";
import { CSS, styled, VariantProps } from "stitches.config";
import Svg from "./svg";
import Text from "./text";

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
  alignItems: "center",
  gap: "$3",
  borderRadius: "$2",
  backgroundColor: "$main",
  variants: {
    variant: {
      info: {
        boxShadow: "$alertInfo",
        [`& ${Text}`]: {
          color: "$text"
        }
      },
      success: {
        boxShadow: "$alertSuccess",
        [`& ${Text}`]: {
          color: "$green"
        }
      },
      warning: {
        boxShadow: "$alertWarning",
        [`& ${Text}`]: {
          color: "$red"
        }
      },
      error: {
        boxShadow: "$alertError",
        [`& ${Text}`]: {
          color: "$red"
        }
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

  const svgIcon: Record<AlertVariants, IconType> = {
    info: IoInformationCircleOutline,
    success: IoCheckmarkCircleOutline,
    warning: IoWarningOutline,
    error: IoAlertCircleOutline
  };

  return (
    <StyledAlert variant={variant} {...other} ref={ref}>
      <Svg as={svgIcon[variant]} variant={svgVariant[variant]} size="4" />
      {children}
    </StyledAlert>
  );
});

Alert.displayName = "Alert";

Alert.toString = () => `.${StyledAlert.className}`;

export default Alert;
