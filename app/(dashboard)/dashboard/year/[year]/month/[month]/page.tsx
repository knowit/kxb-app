import CalendarMonthWithSalary from "@/app/(dashboard)/dashboard/_components/calendar-month-with-salary";
import { getRequestDateNow } from "@/lib/date";
import { getCurrentUser } from "@/lib/session";
import { getUserEarnings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
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

  const userEarnings = await getUserEarnings(user.activeDirectoryId, date);

  return (
    <>
      <CalendarMonthWithSalary
        user={user}
        calendarMonth={calendarMonth}
        userEarnings={userEarnings}
      />
    </>
  );
}
