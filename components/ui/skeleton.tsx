import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...other }: SkeletonProps) {
  return (
    <div
      className={cn("h-5 w-2/5 animate-pulse rounded-md bg-neutral-800", className)}
      {...other}
    />
  );
}
