import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...other }: SkeletonProps) {
  return (
    <div
      className={cn(
        "h-5 w-2/5 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-800",
        className
      )}
      {...other}
    />
  );
}

export { Skeleton };
