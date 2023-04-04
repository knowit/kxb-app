"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...other }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "bg-neutral-200 dark:bg-neutral-700",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-auto w-[1px]",
      className
    )}
    {...other}
  />
));

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
