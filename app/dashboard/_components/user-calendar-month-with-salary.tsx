import {
  UserCalendarMonth,
  UserCalendarMonthSkeleton,
  UserCalendarMonthSkeletonProps
} from "@/app/dashboard/_components/user-calendar-month";
import {
  UserCalendarMonthEarnings,
  UserCalendarMonthEarningsSkeleton
} from "@/app/dashboard/_components/user-calendar-month-earnings";
import { MonthSelect } from "@/components/calendar/month-select";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserEarningsSkeleton } from "@/components/user/user-earnings";
import {
  UserEditSalaryDetailsDialog,
  UserEditSalaryDetailsDialogTriggerSkeleton
} from "@/components/user/user-edit-salary-details-dialog";
import { User, UserSettings, type CalendarMonth as CalendarMonthType } from "@/types";
import Link from "next/link";
import { FC, Suspense } from "react";

async function UserCalendarMonthWithSalary({
  user,
  calendarMonth,
  userSettings
}: {
  user: User;
  calendarMonth: CalendarMonthType;
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

  // sleep 10s
  await new Promise(resolve => setTimeout(resolve, 10000));

  return (
    <div className="flex flex-col gap-12 lg:flex-row">
      <div className="order-1 flex max-w-[380px] flex-col gap-3 lg:-order-1 lg:min-w-[380px]">
        <h2 className="font-bold">
          Salary details for {calendarMonth.month} {calendarMonth.year}
        </h2>
        <Suspense fallback={<UserCalendarMonthEarningsSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <UserCalendarMonthEarnings user={user} month={calendarMonth} />
        </Suspense>
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
            <LinkButton
              href={`/dashboard/year/${previousDate.getFullYear()}/month/${previousDate.getMonth()}`}
              forceOptimisticNavigation
            >
              <span className="sr-only">Forrige måned</span>
              <Icons.ChevronLeft />
            </LinkButton>
            {/* Go to current month */}
            <LinkButton href="/dashboard" forceOptimisticNavigation>
              <span className="">Today</span>
            </LinkButton>
            {/* Go to next month if month.MonthNumber is 11, go to next year and month 0 */}
            <LinkButton
              href={`/dashboard/year/${nextDate.getFullYear()}/month/${nextDate.getMonth()}`}
              forceOptimisticNavigation
            >
              <span className="sr-only">Neste måned</span>
              <Icons.ChevronRight />
            </LinkButton>
          </div>
        </div>
        <Suspense fallback={<UserCalendarMonthSkeleton month={calendarMonth} />}>
          {/* @ts-expect-error Async Server Component */}
          <UserCalendarMonth
            month={calendarMonth}
            closeUserWorkDayDetailsDialogOnSaveSuccess={
              userSettings?.closeUserWorkDayDetailsDialogOnSaveSuccess
            }
            showDialogOnCalendarDayClick
            user={user}
          />
        </Suspense>
      </div>
    </div>
  );
}

const UserCalendarMonthWithSalarySkeleton: FC<UserCalendarMonthSkeletonProps> = ({
  month,
  calendarSizeVariant = "default"
}) => {
  return (
    <div className="flex flex-col gap-12 lg:flex-row">
      <div className="order-1 flex max-w-[380px] flex-col gap-3 lg:-order-1 lg:min-w-[380px]">
        <h2 className="font-bold">
          Salary details for {month.month} {month.year}
        </h2>
        <UserEarningsSkeleton />
        <UserEditSalaryDetailsDialogTriggerSkeleton />
      </div>
      <div className="grow">
        <div className="flex items-start justify-between">
          <div className="">
            <h2 className="text-base">{month.year}</h2>
            <div className="flex h-[40px] items-center">
              <Skeleton className="h-[20px] w-12" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={buttonVariants({ variant: "outline" })}>
              <span className="sr-only">Forrige måned</span>
              <Icons.ChevronLeft />
            </div>
            <div className={buttonVariants({ variant: "outline" })}>
              <span className="">Today</span>
            </div>
            <div className={buttonVariants({ variant: "outline" })}>
              <span className="sr-only">Neste måned</span>
              <Icons.ChevronRight />
            </div>
          </div>
        </div>
        <UserCalendarMonthSkeleton month={month} calendarSizeVariant={calendarSizeVariant} />
      </div>
    </div>
  );
};

export { UserCalendarMonthWithSalary, UserCalendarMonthWithSalarySkeleton };
