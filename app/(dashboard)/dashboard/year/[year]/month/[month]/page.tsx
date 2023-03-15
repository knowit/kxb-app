import { CalendarMonth } from "@/app/(dashboard)/dashboard/_components/calendar-month";
import CompanyBenefits from "@/app/(dashboard)/dashboard/_components/company-benefits";
import { Icons } from "@/components/icons";
import { Card } from "@/components/ui/card";
import { getRequestDateNow } from "@/lib/date";
import { getCurrentUser } from "@/lib/session";
import { getUserEarnings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SelectedYearMonthPageProps {
  params: { year: string; month: string };
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function SelectedYearMonthPage({ params }: SelectedYearMonthPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const currentDate = getRequestDateNow();

  const date = new Date(+(params.year ?? currentDate.getFullYear()), +params.month);
  const calendarMonth = getCalendarMonth(date);

  const userEarnings = await getUserEarnings(user.activeDirectoryId);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div>{`${calendarMonth.month} ${calendarMonth.year}`}</div>
          <div className="flex items-center gap-2">
            {/* Go to previous month if month.MonthNumber is 0, go to previous year and month 11 */}
            <Link
              className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
              href={`/dashboard/year/${
                calendarMonth.monthNumber === 0 ? calendarMonth.year - 1 : calendarMonth.year
              }/month/${calendarMonth.monthNumber === 0 ? 11 : calendarMonth.monthNumber - 1}`}
            >
              <span className="sr-only">Forrige måned</span>
              <Icons.ChevronLeft />
            </Link>
            {/* Go to current month */}
            <Link
              className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
              href="/dashboard"
            >
              <span className="">I dag</span>
            </Link>
            {/* Go to next month if month.MonthNumber is 11, go to next year and month 0 */}
            <Link
              className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
              href={`/dashboard/year/${
                calendarMonth.monthNumber === 11 ? calendarMonth.year + 1 : calendarMonth.year
              }/month/${calendarMonth.monthNumber === 11 ? 0 : calendarMonth.monthNumber + 1}`}
            >
              <span className="sr-only">Neste måned</span>
              <Icons.ChevronRight />
            </Link>
          </div>
        </div>
        <CalendarMonth month={calendarMonth} />
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <Card.Header className="text-xs uppercase">{`Work days in ${calendarMonth.month}`}</Card.Header>
            <Card.Content>
              {userEarnings?.activeCalendarMonthStatistics.workDays.length}
            </Card.Content>
          </Card>
          <Card>
            <Card.Header className="text-xs uppercase">{`Work hours in ${calendarMonth.month}`}</Card.Header>
            <Card.Content>{userEarnings?.activeCalendarMonthStatistics.workHours}</Card.Content>
          </Card>
          <Card>
            <Card.Header className="text-xs uppercase">{`Gross salary ${calendarMonth.month}`}</Card.Header>
            <Card.Content>
              {userEarnings?.activeCalendarMonthStatistics.grossFormatted}
            </Card.Content>
          </Card>
          <Card>
            <Card.Header className="text-xs uppercase">{`Net salary ${calendarMonth.month}`}</Card.Header>
            <Card.Content>{userEarnings?.activeCalendarMonthStatistics.netFormatted}</Card.Content>
          </Card>
        </div>
      </div>
      <div className="col-span-2">
        <CompanyBenefits />
      </div>
    </>
  );
}
