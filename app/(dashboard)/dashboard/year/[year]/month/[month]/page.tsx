import CalendarMonthWithSalary from "@/app/(dashboard)/dashboard/_components/calendar-month-with-salary";
import { getRequestDateNow } from "@/lib/date";
import { query } from "@/lib/query";
import { getUser, getUserEarnings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { redirect } from "next/navigation";

interface SelectedYearMonthPageProps {
  params: { year: string; month: string };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function SelectedYearMonthPage({ params }: SelectedYearMonthPageProps) {
  const currentDate = getRequestDateNow();

  const date = new Date(+(params.year ?? currentDate.getFullYear()), +params.month);
  const calendarMonth = getCalendarMonth(date);

  const [user, userEarnings] = await query([getUser(), getUserEarnings()]);

  if (!user.data) {
    return redirect("/login");
  }
  return (
    <>
      <CalendarMonthWithSalary
        user={user.data}
        calendarMonth={calendarMonth}
        userEarnings={userEarnings.data ?? undefined}
      />
    </>
  );
}
