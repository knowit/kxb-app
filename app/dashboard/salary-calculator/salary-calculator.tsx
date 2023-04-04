"use client";

import { CompanyBenefits } from "@/app/dashboard/_components/company-benefits";
import { CalendarMonth } from "@/components/calendar/calendar-month";
import { Icons } from "@/components/icons";
import { SalaryYearOverview } from "@/components/salary/salary-year-overview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserEarnings } from "@/components/user/user-earnings";
import { getCalendarMonth, getCalendarYear } from "@/utils/calendar-utils";
import { getUserEarningsDetails } from "@/utils/user-utils";
import { atom, useAtom } from "jotai";
import { useMemo, useState } from "react";

const salaryAtom = atom({
  hourlyRate: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_HOURLY_RATE,
  commission: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_COMMISSION,
  tax: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_TAX,
  workHours: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_WORK_HOURS
});

const SalaryCalculator = () => {
  const [salary, setSalary] = useAtom(salaryAtom);
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
          commission: salary.commission ?? 0,
          hourlyRate: salary.hourlyRate ?? 0,
          tax: salary.tax ?? 0,
          workHours: salary.workHours ?? 0
        },
        year,
        nextYear,
        activeMonth,
        month,
        lastMonth,
        nextMonth
      )
    };
  }, [activeDate, salary]);

  return (
    <>
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
                  className="bg-neutral-950"
                  type="number"
                  name="hourlyRate"
                  id="hourlyRate"
                  step="1"
                  value={salary.hourlyRate}
                  onChange={e => setSalary({ ...salary, hourlyRate: +e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="workHours">Work hours</Label>
                <Input
                  className="bg-neutral-950"
                  type="number"
                  name="workHours"
                  id="workHours"
                  step="0.5"
                  value={salary.workHours}
                  onChange={e => setSalary({ ...salary, workHours: +e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="commission">Commission</Label>
                <Input
                  className="bg-neutral-950"
                  type="number"
                  name="commission"
                  id="commission"
                  step="0.01"
                  value={salary.commission}
                  onChange={e => setSalary({ ...salary, commission: +e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="tax">Tax</Label>
                <Input
                  className="bg-neutral-950"
                  type="number"
                  name="tax"
                  id="tax"
                  step="0.01"
                  value={salary.tax}
                  onChange={e => setSalary({ ...salary, tax: +e.target.value })}
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
        <CompanyBenefits />
      </div>
    </>
  );
};

export { SalaryCalculator };
