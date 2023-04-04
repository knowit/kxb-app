import { UserCalendarMonthWithSalarySkeleton } from "@/app/dashboard/_components/user-calendar-month-with-salary";
import { getRequestDateNow } from "@/lib/date";
import { getCalendarMonth } from "@/utils/calendar-utils";

interface SelectedYearMonthPageProps {
  params: { year: string; month: string };
}

export default async function SelectedYearMonthLoading({ params }: SelectedYearMonthPageProps) {
  const currentDate = getRequestDateNow();
  const calendarMonth = getCalendarMonth(currentDate);

  return (
    <>
      <UserCalendarMonthWithSalarySkeleton month={calendarMonth} />
    </>
  );
}
