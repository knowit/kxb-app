"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ children, className, align = "center", side = "bottom", sideOffset = 4, ...other }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 rounded-md border border-neutral-100 bg-white p-2 text-sm shadow-md outline-none animate-in zoom-in-90 dark:border-neutral-700 dark:bg-neutral-900",
      className
    )}
    {...other}
  >
    {children}
    <HoverCardPrimitive.Arrow className="fill-current text-neutral-700" />
  </HoverCardPrimitive.Content>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
