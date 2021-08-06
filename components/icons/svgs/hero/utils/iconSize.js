const DEFAULT_ICON_SIZE = "base";

const ICON_SIZES = {
  xs: "xs",
  sm: "sm",
  base: "base",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  "3xl": "3xl",
  "4xl": "4xl",
  "5xl": "5xl",
  "6xl": "6xl",
  "7xl": "7xl",
  "8xl": "8xl",
  "9xl": "9xl"
};

const getIconSize = size => ICON_SIZES[size] ?? DEFAULT_ICON_SIZE;

const getIconSizeClassnames = size => {
  const iconSize = getIconSize(size);

  switch (iconSize) {
    case "xs":
      return "h-3 w-3";
    case "sm":
      return "h-4 w-4";
    case "base":
      return "h-6 w-6";
    case "lg":
      return "h-8 w-8";
    case "xl":
      return "h-10 w-10";
    case "2xl":
      return "h-12 w-12";
    case "3xl":
      return "h-14 w-14";
    case "4xl":
      return "h-16 w-16";
    case "5xl":
      return "h-20 w-20";
    case "6xl":
      return "h-24 w-24";
    case "7xl":
      return "h-28 w-28";
    case "8xl":
      return "h-32 w-32";
    case "9xl":
      return "h-36 w-36";
    default:
      "h-6 w-6";
  }
};

export { getIconSize, getIconSizeClassnames };
