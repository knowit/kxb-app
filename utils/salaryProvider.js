import { useUser } from "@/components/user";
import DEFAULT_USER_SALARY from "@/constants/defaultUserSalary";
import { useCalendar } from "@/utils/calendarProvider";
import { getUserEarningsDetails, getUserSalaryDetails } from "@/utils/userUtils";
import * as React from "react";

const initialState = {
  hourlyRate: DEFAULT_USER_SALARY.hourlyRate,
  commission: DEFAULT_USER_SALARY.commission,
  tax: DEFAULT_USER_SALARY.tax,
  nonCommissionedHours: 0
};

const SalaryContext = React.createContext();
SalaryContext.displayName = "SalaryContext";

function SalaryProvider({ children }) {
  const { user, isLoadingUser } = useUser();

  const [nonCommissionedHours, setNonCommissionedHours] = React.useState(0);

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
        nonCommissionedHours
      ),
    [
      userSalaryDetails,
      year,
      nextYear,
      monthDetail,
      currentMonthDetail,
      lastMonthDetail,
      nextMonthDetail,
      nonCommissionedHours
    ]
  );

  const value = React.useMemo(
    () => ({
      ...userEarningsDetails,
      setNonCommissionedHours,
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
