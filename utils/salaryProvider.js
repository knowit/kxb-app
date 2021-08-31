import { useUser } from "@/components/user";
import { useCalendar } from "@/utils/calendarProvider";
import { getUserEarningsDetails, getUserSalaryDetails } from "@/utils/userUtils";
import * as React from "react";

const SalaryContext = React.createContext();
SalaryContext.displayName = "SalaryContext";

function SalaryProvider({ children }) {
  const { user, isLoadingUser } = useUser();

  const {
    year,
    nextYear,
    monthDetail,
    currentMonthDetail,
    lastMonthDetail,
    nextMonthDetail,
    isLoadingCalendar
  } = useCalendar();

  const userSalaryDetails = React.useMemo(() => getUserSalaryDetails(user), [user]);

  const userEarningsDetails = React.useMemo(
    () =>
      getUserEarningsDetails(
        userSalaryDetails,
        year,
        nextYear,
        monthDetail,
        currentMonthDetail,
        lastMonthDetail,
        nextMonthDetail,
        user.workDayDetails
      ),
    [
      userSalaryDetails,
      year,
      nextYear,
      monthDetail,
      currentMonthDetail,
      lastMonthDetail,
      nextMonthDetail,
      user.workDayDetails
    ]
  );

  const value = React.useMemo(
    () => ({
      ...userEarningsDetails,
      isLoadingSalary: !userEarningsDetails || isLoadingUser || isLoadingCalendar
    }),
    [userEarningsDetails, isLoadingUser, isLoadingCalendar]
  );

  return <SalaryContext.Provider value={value}>{children}</SalaryContext.Provider>;
}
function useSalary() {
  const context = React.useContext(SalaryContext);

  if (context === undefined) {
    throw new Error("useSalary must be used within a SalaryProvider");
  }

  return context;
}
export { SalaryProvider, useSalary };
