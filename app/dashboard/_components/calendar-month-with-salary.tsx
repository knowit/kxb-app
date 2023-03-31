import { CalendarMonth } from "@/app/dashboard/_components/calendar-month";
import { MonthSelect } from "@/components/calendar/month-select";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { UserEarnings } from "@/components/user/user-earnings";
import { UserEditSalaryDetailsDialog } from "@/components/user/user-edit-salary-details-dialog";
import {
  User,
  UserEarningsDetails,
  UserSettings,
  type CalendarMonth as CalendarMonthType
} from "@/types";
import Link from "next/link";

function CalendarMonthWithSalary({
  user,
  calendarMonth,
  userEarnings,
  userSettings
}: {
  user: User;
  calendarMonth: CalendarMonthType;
  userEarnings?: UserEarningsDetails;
  userSettings?: UserSettings;
}) {
  const previousDate = new Date(
    calendarMonth.monthNumber === 0 ? calendarMonth.year - 1 : calendarMonth.year,
    calendarMonth.monthNumber === 0 ? 11 : calendarMonth.monthNumber - 1,
    1
  );
  const nextDate = new Date(
    calendarMonth.monthNumber === 11 ? calendarMonth.year + 1 : calendarMonth.year,
    calendarMonth.monthNumber === 11 ? 0 : calendarMonth.monthNumber + 1,
    1
  );

  return (
    <div className="flex flex-col gap-12 lg:flex-row">
      <div className="order-1 flex max-w-[380px] flex-col gap-3 lg:-order-1 lg:min-w-[380px]">
        <h2 className="font-bold">
          Salary details for {calendarMonth.month} {calendarMonth.year}
        </h2>
        <UserEarnings userEarnings={userEarnings} calendarMonth={calendarMonth} />
        <UserEditSalaryDetailsDialog
          user={user}
          closeDialogOnFormSubmitSuccess={userSettings?.closeUserSalaryDialogOnSaveSuccess}
        />
      </div>
      <div className="grow">
        <div className="flex items-start justify-between">
          <div className="">
            <Link href={`/dashboard/year/${calendarMonth.year}`}>
              <h2 className="text-base">{calendarMonth.year}</h2>
            </Link>
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
              href={`/dashboard/year/${previousDate.getFullYear()}/month/${previousDate.getMonth()}`}
            >
              <span className="sr-only">Forrige måned</span>
              <Icons.ChevronLeft />
            </Link>
            {/* Go to current month */}
            <Link className={buttonVariants({ variant: "outline" })} href="/dashboard">
              <span className="">Today</span>
            </Link>
            {/* Go to next month if month.MonthNumber is 11, go to next year and month 0 */}
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={`/dashboard/year/${nextDate.getFullYear()}/month/${nextDate.getMonth()}`}
            >
              <span className="sr-only">Neste måned</span>
              <Icons.ChevronRight />
            </Link>
          </div>
        </div>
        <CalendarMonth
          month={calendarMonth}
          workDayDetails={userEarnings?.workDayDetails}
          closeUserWorkDayDetailsDialogOnSaveSuccess={
            userSettings?.closeUserWorkDayDetailsDialogOnSaveSuccess
          }
          showDialogOnCalendarDayClick
        />
      </div>
    </div>
  );
}

export { CalendarMonthWithSalary };
