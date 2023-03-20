import { MonthSelect } from "@/components/calendar/month-select";
import { Icons } from "@/components/icons";
import { SalaryDetailsCard } from "@/components/salary/salary-details-card";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Show } from "@/components/ui/show";
import { UserEditSalaryDetailsDialog } from "@/components/user/user-edit-salary-details-dialog";
import { User, UserEarningsDetails, type CalendarMonth as CalendarMonthType } from "@/types";
import Link from "next/link";
import { CalendarMonth } from "./calendar-month";

export default function CalendarMonthWithSalary({
  user,
  calendarMonth,
  userEarnings
}: {
  user: User;
  calendarMonth: CalendarMonthType;
  userEarnings?: UserEarningsDetails;
}) {
  return (
    <div className="flex flex-col gap-12 lg:flex-row">
      <div className="flex max-w-[380px] flex-col gap-3 lg:min-w-[380px]">
        <h2 className="font-bold">
          Salary details for {calendarMonth.month} {calendarMonth.year}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <SalaryDetailsCard heading="Work days">
            {userEarnings?.activeCalendarMonthStatistics.workDays.length.toString()}
          </SalaryDetailsCard>
          <SalaryDetailsCard heading="Work hours">
            {userEarnings?.activeCalendarMonthStatistics.workHours.toString()}
          </SalaryDetailsCard>
          <SalaryDetailsCard heading="Gross salary">
            {userEarnings?.activeCalendarMonthStatistics.grossFormatted}
          </SalaryDetailsCard>
          <SalaryDetailsCard heading="Net salary">
            {userEarnings?.activeCalendarMonthStatistics.netFormatted}
          </SalaryDetailsCard>
        </div>
        <Show when={calendarMonth.halfTax}>
          <Card className="flex items-center">
            <Card.Content className="flex items-center gap-3 p-4">
              <div className="flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded-full border border-emerald-500 text-emerald-500">
                <Icons.Check />
              </div>
              <span className="text-emerald-500">
                Salary for {calendarMonth.month} paid with{" "}
                <span className="underline">half tax</span> at{" "}
                {userEarnings?.nextMonthStatistics?.payDay}
              </span>
            </Card.Content>
          </Card>
        </Show>
        <UserEditSalaryDetailsDialog user={user} />
      </div>
      <div className="grow">
        <div className="flex items-start justify-between">
          <div className="">
            <h2 className="text-xs">{calendarMonth.year}</h2>
            <MonthSelect
              className="max-w-[110px]"
              year={calendarMonth.year}
              month={calendarMonth.monthNumber}
            />
          </div>
          <div className="flex items-center gap-2">
            {/* Go to previous month if month.MonthNumber is 0, go to previous year and month 11 */}
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={`/dashboard/year/${
                calendarMonth.monthNumber === 0 ? calendarMonth.year - 1 : calendarMonth.year
              }/month/${calendarMonth.monthNumber === 0 ? 11 : calendarMonth.monthNumber - 1}`}
            >
              <span className="sr-only">Forrige måned</span>
              <Icons.ChevronLeft />
            </Link>
            {/* Go to current month */}
            <Link className={buttonVariants({ variant: "outline" })} href="/dashboard">
              <span className="">I dag</span>
            </Link>
            {/* Go to next month if month.MonthNumber is 11, go to next year and month 0 */}
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={`/dashboard/year/${
                calendarMonth.monthNumber === 11 ? calendarMonth.year + 1 : calendarMonth.year
              }/month/${calendarMonth.monthNumber === 11 ? 0 : calendarMonth.monthNumber + 1}`}
            >
              <span className="sr-only">Neste måned</span>
              <Icons.ChevronRight />
            </Link>
          </div>
        </div>
        <CalendarMonth month={calendarMonth} workDayDetails={userEarnings?.workDayDetails} />
      </div>
    </div>
  );
}
