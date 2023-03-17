import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { Card } from "../ui/card";

const SalaryDetailsCard = ({
  children,
  className,
  heading,
  ...other
}: ComponentPropsWithoutRef<typeof Card> & { heading: string }) => {
  return (
    <Card className={cn("py-3", className)} {...other}>
      <Card.Header className="mb-1 px-3 py-0 text-xs uppercase">{heading}</Card.Header>
      <Card.Content className="px-3 py-0 text-lg font-bold">{children}</Card.Content>
    </Card>
  );
};

export { SalaryDetailsCard };
