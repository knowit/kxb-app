"use client";

import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

type AvatarSize = "default" | "sm" | "lg" | "xl";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & { size?: AvatarSize }
>(({ className, size = "default", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      {
        "h-12 w-12": size === "default",
        "h-8 w-8": size === "sm",
        "h-16 w-16": size === "lg",
        "h-20 w-20": size === "xl"
      },
      className
    )}
    {...props}
  />
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800",
      className
    )}
    {...props}
  />
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarSkeleton = ({ size = "default" }: { size?: AvatarSize }) => (
  <div
    className={cn("relative flex shrink-0 overflow-hidden rounded-full", {
      "h-12 w-12": size === "default",
      "h-8 w-8": size === "sm",
      "h-16 w-16": size === "lg",
      "h-20 w-20": size === "xl"
    })}
  >
    <div className="aspect-square h-full w-full animate-pulse bg-neutral-100 dark:bg-neutral-800" />
  </div>
);

export { Avatar, AvatarImage, AvatarFallback, AvatarSkeleton };
