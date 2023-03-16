import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type FlexElementRef = React.ElementRef<"div">;
type FlexProps = React.ComponentPropsWithoutRef<"div"> & {
  children?: React.ReactNode;
  className?: string;
  direction?: "row" | "column" | "rowReverse" | "columnReverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "even";
  wrap?: "no-wrap" | "wrap" | "wrap-reverse";
  grow?: "grow" | "no-grow";
  gap?:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "14"
    | "16"
    | "20"
    | "24"
    | "28"
    | "32"
    | "36"
    | "40"
    | "44"
    | "48"
    | "52"
    | "56"
    | "60"
    | "64"
    | "72"
    | "80"
    | "96";
};

const Flex = forwardRef<FlexElementRef, FlexProps>(
  (
    {
      children,
      className,
      direction = "row",
      align = "stretch",
      justify = "start",
      wrap = "no-wrap",
      grow,
      gap,
      ...other
    },
    forwardedRef
  ) => {
    return (
      <div
        className={cn(
          "flex flex-nowrap",
          {
            "flex-row": direction === "row",
            "flex-col": direction === "column",
            "flex-row-reverse": direction === "rowReverse",
            "flex-col-reverse": direction === "columnReverse",
            "items-start": align === "start",
            "items-center": align === "center",
            "items-end": align === "end",
            "items-stretch": align === "stretch",
            "items-baseline": align === "baseline",
            "justify-start": justify === "start",
            "justify-center": justify === "center",
            "justify-end": justify === "end",
            "justify-between": justify === "between",
            "justify-evenly": justify === "even",
            "flex-nowrap": wrap === "no-wrap",
            "flex-wrap": wrap === "wrap",
            "flex-wrap-reverse": wrap === "wrap-reverse",
            grow: grow === "grow",
            "grow-0": grow === "no-grow",
            gap: gap === "0",
            "gap-1": gap === "1",
            "gap-2": gap === "2",
            "gap-3": gap === "3",
            "gap-4": gap === "4",
            "gap-5": gap === "5",
            "gap-6": gap === "6",
            "gap-7": gap === "7",
            "gap-8": gap === "8",
            "gap-9": gap === "9",
            "gap-10": gap === "10",
            "gap-11": gap === "11",
            "gap-12": gap === "12",
            "gap-14": gap === "14",
            "gap-16": gap === "16",
            "gap-20": gap === "20",
            "gap-24": gap === "24",
            "gap-28": gap === "28",
            "gap-32": gap === "32",
            "gap-36": gap === "36",
            "gap-40": gap === "40",
            "gap-44": gap === "44",
            "gap-48": gap === "48",
            "gap-52": gap === "52",
            "gap-56": gap === "56",
            "gap-60": gap === "60",
            "gap-64": gap === "64",
            "gap-72": gap === "72",
            "gap-80": gap === "80",
            "gap-96": gap === "96"
          },
          className
        )}
        {...other}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

export { Flex };
export type { FlexProps };
