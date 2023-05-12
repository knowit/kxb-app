import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-neutral-950 hover:bg-neutral-950/80 border-transparent text-neutral-50",
        secondary: "bg-neutral-800 hover:bg-neutral-800/80 border-transparent text-neutral-50",
        destructive: "bg-red-700 hover:bg-red-700/80 border-transparent text-neutral-50",
        outline: "text-neutral-50 border-neutral-50",
        green: "bg-emerald-500 hover:bg-emerald-500/80 border-transparent text-emerald-950",
        "outline-subtle": "text-neutral-500 border-neutral-500 hover:border-neutral-500/80",
        "outline-green": "text-emerald-500 border-emerald-500 hover:border-emerald-500/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
