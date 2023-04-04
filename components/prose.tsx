import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

const Prose = ({ children, className, ...other }: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "prose prose-neutral mb-8 dark:prose-invert prose-p:text-neutral-50",
        className
      )}
      {...other}
    >
      {children}
    </div>
  );
};

export { Prose };
