import { Card } from "@/components/ui/card";
import { InfoButton } from "@/components/ui/info-button";
import { Show } from "@/components/ui/show";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

const SalaryDetailsCard = ({
  children,
  className,
  heading,
  info,
  ...other
}: ComponentPropsWithoutRef<typeof Card> & { heading: string; info?: string }) => {
  return (
    <Card className={cn("py-3", className)} {...other}>
      <Card.Header
        className={cn("mb-1 px-3 py-0 text-xs uppercase", {
          "relative flex items-center justify-between": !!info
        })}
      >
        {heading}
        <Show when={!!info}>
          <InfoButton
            className="absolute right-1 top-[-6px] lg:right-3"
            size="sm"
            popoverProps={{
              variant: "subtle",
              side: "top"
            }}
          >
            {info}
          </InfoButton>
        </Show>
      </Card.Header>
      <Card.Content className="px-3 py-0 text-lg font-bold">{children}</Card.Content>
    </Card>
  );
};

const SalaryDetailsCardSkeleton = () => {
  return (
    <Card className="py-3">
      <Card.Header className="mb-1 px-3 py-0 text-xs uppercase">
        <Skeleton className="h-[16px] w-24 rounded" />
      </Card.Header>
      <Card.Content className="px-3 py-0 text-lg font-bold">
        <Skeleton className="h-[28px] w-36 rounded" />
      </Card.Content>
    </Card>
  );
};

export { SalaryDetailsCard, SalaryDetailsCardSkeleton };
