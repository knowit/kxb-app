"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSalaryCompareInputs } from "@/lib/actions/salary-compare-inputs-actions";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentPropsWithoutRef, useCallback, useState } from "react";

const CompareSalaryInputs = ({
  className,
  initialHourlyRate = +process.env.NEXT_PUBLIC_SALARY_DEFAULT_HOURLY_RATE,
  initialCommission = +process.env.NEXT_PUBLIC_SALARY_DEFAULT_COMMISSION,
  initialTax = +process.env.NEXT_PUBLIC_SALARY_DEFAULT_TAX,
  initialWorkHours = +process.env.NEXT_PUBLIC_SALARY_DEFAULT_WORK_HOURS,
  initialTaxTable,
  ...other
}: ComponentPropsWithoutRef<"div"> & {
  initialHourlyRate?: number;
  initialCommission?: number;
  initialTax?: number;
  initialWorkHours?: number;
  initialTaxTable?: string;
}) => {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [hourlyRate, setHourlyRate] = useState<number>(initialHourlyRate);
  const [commission, setCommission] = useState<number>(initialCommission);
  const [tax, setTax] = useState<number>(initialTax);
  const [workHours, setWorkHours] = useState<number>(initialWorkHours);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className={cn(className)} {...other}>
      <h2>Salary input</h2>
      <form>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="hourlyRate">Hourly rate</Label>
            <Input
              variant="dark"
              type="number"
              name="hourlyRate"
              id="hourlyRate"
              step="1"
              value={hourlyRate}
              onChange={e => {
                setHourlyRate(+e.target.value);
                router.push(pathname + "?" + createQueryString("hourlyRate", e.target.value));
                setSalaryCompareInputs({
                  type: "SET_HOURLY_RATE",
                  payload: e.target.value
                });
              }}
            />
          </div>
          <div>
            <Label htmlFor="workHours">Work hours</Label>
            <Input
              variant="dark"
              type="number"
              name="workHours"
              id="workHours"
              step="0.5"
              value={workHours}
              onChange={e => {
                setWorkHours(+e.target.value);
                router.push(pathname + "?" + createQueryString("workHours", e.target.value));
                setSalaryCompareInputs({
                  type: "SET_WORK_HOURS",
                  payload: e.target.value
                });
              }}
            />
          </div>
          <div>
            <Label htmlFor="commission">Commission</Label>
            <Input
              variant="dark"
              type="number"
              name="commission"
              id="commission"
              step="0.01"
              value={commission}
              onChange={e => {
                setCommission(+e.target.value);
                router.push(pathname + "?" + createQueryString("commission", e.target.value));
                setSalaryCompareInputs({
                  type: "SET_COMMISSION",
                  payload: e.target.value
                });
              }}
            />
          </div>
          <div>
            <Label htmlFor="tax">Tax</Label>
            <Input
              variant="dark"
              type="number"
              name="tax"
              id="tax"
              step="0.01"
              value={tax}
              onChange={e => {
                setTax(+e.target.value);
                router.push(pathname + "?" + createQueryString("tax", e.target.value));
                setSalaryCompareInputs({
                  type: "SET_TAX",
                  payload: e.target.value
                });
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export { CompareSalaryInputs };
