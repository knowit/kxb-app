"use client";

import { MONTH } from "@/constants/date-constants";
import { useRouter } from "next/navigation";
import { forwardRef, useTransition, type ComponentPropsWithoutRef, type ElementRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const MonthSelect = forwardRef<
  ElementRef<typeof SelectTrigger>,
  ComponentPropsWithoutRef<typeof SelectTrigger> & {
    year: number;
    month: number;
    isSelected?: boolean;
  }
>(({ className, year, month, isSelected = false, ...other }, forwardedRef) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      defaultValue={month.toString()}
      onValueChange={value => {
        router.prefetch(`/dashboard/year/${year}/month/${value}`);
        // update url
        router.push(`/dashboard/year/${year}/month/${value}`, {
          forceOptimisticNavigation: true
        });

        // start transition
        startTransition(() => {
          // Refresh the current route and fetch new data from the server without
          // losing client-side browser or React state.
          router.refresh();
        });
      }}
      disabled={isPending}
    >
      <SelectTrigger
        className={cn(
          "h-[40px] border-none px-0 text-base ",
          { "underline underline-offset-2 dark:text-emerald-500": isSelected },
          className
        )}
        {...other}
        ref={forwardedRef}
      >
        <SelectValue placeholder={month} />
        <span className="sr-only">Toggle month</span>
      </SelectTrigger>
      <SelectContent>
        {Object.values(MONTH).map(m => (
          <SelectItem
            key={m.value}
            value={m.value.toString()}
            onMouseEnter={() => {
              router.prefetch(`/dashboard/year/${year}/month/${m.value}`);
            }}
          >
            <div className="flex items-center gap-3">{m.i18n.en}</div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

MonthSelect.displayName = "MonthSelect";

export { MonthSelect };
