import { CalendarMonth } from "@/components/calendar/calendar-month";
import { UserEarnings, UserEarningsSkeleton } from "@/components/user/user-earnings";
import { getUserWithEarnings } from "@/lib/user";
import { SelectUser } from "../../../lib/db/schema";

type UserCalendarMonthProps = {
  user: SelectUser;
  month: CalendarMonth;
};

async function UserCalendarMonthEarnings({ user, month, ...other }: UserCalendarMonthProps) {
  const { earnings } = await getUserWithEarnings(
    user.id,
    new Date(month.year, month.monthNumber, 15)
  );

  return <UserEarnings userEarnings={earnings} calendarMonth={month} />;
}

const UserCalendarMonthEarningsSkeleton = () => {
  return <UserEarningsSkeleton />;
};

export { UserCalendarMonthEarnings, UserCalendarMonthEarningsSkeleton };
