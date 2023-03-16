import { getRequestDateNow } from "@/lib/date";
import { getCurrentUser } from "@/lib/session";
import { getUserEarnings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { redirect } from "next/navigation";
import CalendarMonthWithSalary from "./_components/calendar-month-with-salary";
import CompanyBenefits from "./_components/company-benefits";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const currentDate = getRequestDateNow();

  const calendarMonth = getCalendarMonth(currentDate);

  const userEarnings = await getUserEarnings(user.activeDirectoryId);

  return (
    <>
      <CalendarMonthWithSalary
        user={user}
        calendarMonth={calendarMonth}
        userEarnings={userEarnings}
      />
      <CompanyBenefits />
    </>
  );
}
