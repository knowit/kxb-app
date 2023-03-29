import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const infoButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 disabled:opacity-50 dark:focus:ring-neutral-400 disabled:pointer-events-none dark:focus:ring-offset-neutral-900",
  {
    variants: {
      variant: {
        default: "bg-transparent text-neutral-900 hover:bg-neutral-700 dark:text-neutral-50"
      },
      size: {
        default: "h-9 p-2",
        sm: "h-7 p-2 rounded-md",
        lg: "h-11 p-8 rounded-md"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export type InfoButtonProps = React.ComponentPropsWithoutRef<typeof Button> &
  VariantProps<typeof infoButtonVariants> & {
    popoverProps?: React.ComponentPropsWithoutRef<typeof PopoverContent>;
  };

const InfoButton = React.forwardRef<React.ElementRef<"button">, InfoButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      popoverProps = {
        variant: "subtle",
        side: "right"
      },
      ...other
    },
    ref
  ) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(infoButtonVariants({ variant, size, className }))}
            ref={ref}
            {...other}
          >
            <Icons.Info />
          </button>
        </PopoverTrigger>
        <PopoverContent {...popoverProps}>
          {children}
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    );
  }
);
InfoButton.displayName = "InfoButton";

export { InfoButton };
