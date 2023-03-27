import { Icons } from "@/components/icons";
import { SalaryDetailsCard } from "@/components/salary/salary-details-card";
import { Card } from "@/components/ui/card";
import { Show } from "@/components/ui/show";
import { CalendarMonth, UserEarningsDetails } from "@/types";

const UserEarnings = ({
  userEarnings,
  calendarMonth
}: {
  userEarnings?: UserEarningsDetails;
  calendarMonth: CalendarMonth;
}) => {
  return (
    <div>
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
              Salary for {calendarMonth.month} paid with <span className="underline">half tax</span>{" "}
              at {userEarnings?.nextMonthStatistics?.payDay}
            </span>
          </Card.Content>
        </Card>
      </Show>
    </div>
  );
};

export { UserEarnings };
