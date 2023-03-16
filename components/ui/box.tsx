import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type BoxElementRef = React.ElementRef<"div">;
type BoxProps = React.ComponentPropsWithoutRef<"div"> & {
  children?: React.ReactNode;
  className?: string;
};

const Box = forwardRef<BoxElementRef, BoxProps>(
  ({ children, className, ...other }, forwardedRef) => {
    return (
      <div className={cn("box-border", className)} {...other} ref={forwardedRef}>
        {children}
      </div>
    );
  }
);

Box.displayName = "Box";

export { Box };
export type { BoxProps };
