import { CalendarMonthWithSalary } from "@/app/dashboard/_components/calendar-month-with-salary";
import { MONTH } from "@/constants/date-constants";
import { getRequestDateNow } from "@/lib/date";
import { query } from "@/lib/query";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserEarnings, getUserSettings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface SelectedYearMonthPageProps {
  params: { year: string; month: string };
}

export const runtime = "experimental-edge";

export function generateMetadata({ params }: SelectedYearMonthPageProps): Metadata {
  const month = Object.values(MONTH).find(month => month.value === +params.month);

  return {
    title: `${month?.i18n.en} - ${params.year}`
  };
}

export default async function SelectedYearMonthPage({ params }: SelectedYearMonthPageProps) {
  const token = await getEdgeFriendlyToken();
  const currentDate = getRequestDateNow();

  const date = new Date(+(params.year ?? currentDate.getFullYear()), +params.month);
  const calendarMonth = getCalendarMonth(date);

  const [userEarnings, userSettings] = await query([
    getUserEarnings(token.id, date),
    getUserSettings(token.id)
  ]);

  if (!userEarnings.data?.user) {
    return redirect("/logout");
  }
  return (
    <>
      <CalendarMonthWithSalary
        user={userEarnings.data?.user}
        calendarMonth={calendarMonth}
        userEarnings={userEarnings.data?.earnings}
        userSettings={userSettings.data}
      />
    </>
  );
}
