import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface AdminShellProps extends HTMLAttributes<HTMLDivElement> {}

export function AdminShell({ children, className, ...props }: AdminShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  );
}
