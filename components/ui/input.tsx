import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "dark";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", ...other }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-neutral-700 bg-transparent px-3 py-2 text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-50 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-900",
          {
            "dark:bg-neutral-950": variant === "dark"
          },
          className
        )}
        ref={ref}
        {...other}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
