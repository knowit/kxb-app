"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    variant?: "default" | "subtle";
  }
>(({ className, align = "center", sideOffset = 4, variant = "default", ...other }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-xs rounded-md border border-neutral-100 bg-neutral-50 p-4 shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 sm:max-w-sm md:max-w-md dark:border-neutral-700 dark:bg-neutral-950",
        {
          "dark:bg-neutral-900": variant === "subtle"
        },
        className
      )}
      {...other}
    />
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...other }, ref) => (
  <PopoverPrimitive.Arrow
    className={cn("fill-current text-neutral-700", className)}
    {...other}
    ref={ref}
  />
));

PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

export { Popover, PopoverArrow, PopoverContent, PopoverTrigger };
