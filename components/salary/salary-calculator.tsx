"use client";

import { CalendarMonth } from "@/components/calendar/calendar-month";
import { Icons } from "@/components/icons";
import { SalaryYearOverview } from "@/components/salary/salary-year-overview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserEarnings } from "@/components/user/user-earnings";
import { cn } from "@/lib/utils";
import { getCalendarMonth, getCalendarYear } from "@/utils/calendar-utils";
import { getUserEarningsDetails } from "@/utils/user-utils";
import { ComponentPropsWithoutRef, useMemo, useState } from "react";

const SalaryCalculator = ({
  className,
  initialHourlyRate = +process.env.NEXT_PUBLIC_SALARY_DEFAULT_HOURLY_RATE,
  initialCommission = +process.env.NEXT_PUBLIC_SALARY_DEFAULT_COMMISSION,
  initialTax = +process.env.NEXT_PUBLIC_SALARY_DEFAULT_TAX,
  initialWorkHours = +process.env.NEXT_PUBLIC_SALARY_DEFAULT_WORK_HOURS,
  ...other
}: ComponentPropsWithoutRef<"div"> & {
  initialHourlyRate?: number;
  initialCommission?: number;
  initialTax?: number;
  initialWorkHours?: number;
}) => {
  const [hourlyRate, setHourlyRate] = useState<number>(initialHourlyRate);
  const [commission, setCommission] = useState<number>(initialCommission);
  const [tax, setTax] = useState<number>(initialTax);
  const [workHours, setWorkHours] = useState<number>(initialWorkHours);

  const [activeDate, setActiveDate] = useState<Date>(new Date());

  const { activeMonth, userEarnings } = useMemo(() => {
    const now = new Date();

    const year = getCalendarYear(activeDate.getFullYear());
    const currentYear = new Date().getFullYear();

    const lastYear = getCalendarYear(currentYear - 1);
    const nextYear = getCalendarYear(currentYear + 1);

    const currentMonth = activeDate ? activeDate.getMonth() : now.getMonth();

    const month = getCalendarMonth(now);
    const activeMonth = activeDate ? getCalendarMonth(activeDate) : month;
    const lastMonth = getCalendarMonth(new Date(currentYear, currentMonth - 1));
    const nextMonth = getCalendarMonth(new Date(currentYear, currentMonth + 1));

    return {
      month: month,
      activeMonth: activeMonth,
      userEarnings: getUserEarningsDetails(
        {
          commission: commission ?? 0,
          hourlyRate: hourlyRate ?? 0,
          tax: tax ?? 0,
          workHours: workHours ?? 0,
          taxTable: null
        },
        year,
        nextYear,
        activeMonth,
        month,
        lastMonth,
        nextMonth
      )
    };
  }, [activeDate, commission, hourlyRate, tax, workHours]);

  return (
    <div className={cn(className)}>
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="order-1 flex max-w-[380px] flex-col gap-3 lg:-order-1 lg:min-w-[380px]">
          <h2>
            Salary details for {activeMonth.month} {activeMonth.year}
          </h2>
          <UserEarnings userEarnings={userEarnings} calendarMonth={activeMonth} />
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
                  onChange={e => setHourlyRate(+e.target.value)}
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
                  onChange={e => setWorkHours(+e.target.value)}
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
                  onChange={e => setCommission(+e.target.value)}
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
                  onChange={e => setTax(+e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="grow space-y-3">
          <div className="flex items-center justify-between">
            <div>{activeMonth.month}</div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setActiveDate(activeDate => {
                    // Go to previous month if month.MonthNumber is 0, go to previous year and month 11
                    const newDate = new Date(activeDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    return newDate;
                  })
                }
              >
                <Icons.ChevronLeft />
              </Button>
              {/* Go to current month */}
              <Button variant="outline" onClick={() => setActiveDate(new Date())}>
                <span className="">Today</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Go to next month if month.MonthNumber is 11, go to next year and month 0
                  const newDate = new Date(activeDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setActiveDate(newDate);
                }}
              >
                <Icons.ChevronRight />
              </Button>
            </div>
          </div>
          <CalendarMonth month={activeMonth}></CalendarMonth>
        </div>
      </div>
      <div className="flex flex-col space-y-24">
        <SalaryYearOverview yearSalaryStatistics={userEarnings?.yearSalaryStatistics} />
      </div>
    </div>
  );
};

export { SalaryCalculator };
