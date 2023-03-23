import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle";
}

export function Card({ className, variant = "default", ...other }: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border dark:border-neutral-700 dark:bg-neutral-950",
        {
          "dark:border-neutral-700 dark:bg-neutral-950": variant === "default",
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100":
            variant === "subtle"
        },
        className
      )}
      {...other}
    />
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Header = function CardHeader({ className, ...other }: CardHeaderProps) {
  return <div className={cn("grid gap-1 p-6", className)} {...other} />;
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Content = function CardContent({ className, ...other }: CardContentProps) {
  return <div className={cn("px-6 pb-4 ", className)} {...other} />;
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Footer = function CardFooter({ className, ...other }: CardFooterProps) {
  return (
    <div
      className={cn(
        "border-t border-neutral-700 bg-neutral-50 px-6 py-4 dark:bg-neutral-800",
        className
      )}
      {...other}
    />
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

Card.Title = function CardTitle({ className, ...other }: CardTitleProps) {
  return <h4 className={cn("text-lg font-medium", className)} {...other} />;
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

Card.Description = function CardDescription({ className, ...other }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-neutral-600 dark:text-neutral-300", className)} {...other} />
  );
};

Card.Skeleton = function CardSeleton() {
  return (
    <Card>
      <Card.Header className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </Card.Header>
      <Card.Content className="h-10" />
      <Card.Footer>
        <Skeleton className="h-8 w-[120px] bg-neutral-200" />
      </Card.Footer>
    </Card>
  );
};
