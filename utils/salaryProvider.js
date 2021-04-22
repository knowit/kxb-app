import * as React from "react";
import { useUser } from "../components/user";
import DEFAULT_USER_SALARY from "../constants/defaultUserSalary";
import { getEarningsForMonth } from "../logic/earningsLogic";
import { useCalendar } from "./calendarProvider";

const initialState = {
  hourlyRate: DEFAULT_USER_SALARY.hourlyRate,
  commission: DEFAULT_USER_SALARY.commission,
  tax: DEFAULT_USER_SALARY.tax,
  nonCommissionedHours: 0
};

const SalaryContext = React.createContext();
SalaryContext.displayName = "SalaryContext";

function SalaryProvider({ children }) {
  const { user } = useUser();

  const userSalaryDetails = React.useMemo(
    () => ({
      hourlyRate: user?.hourlyRate ?? DEFAULT_USER_SALARY.hourlyRate,
      commission: user?.commission ?? DEFAULT_USER_SALARY.commission,
      tax: user?.tax ?? DEFAULT_USER_SALARY.tax
    }),
    [user]
  );

  const [nonCommissionedHours, setNonCommissionedHours] = React.useState(0);
  const { monthDetail, currentMonthDetail, lastMonthDetail, nextMonthDetail } = useCalendar();

  const value = React.useMemo(() => {
    const { hourlyRate, commission, tax } = userSalaryDetails;

    const monthStatistics = getEarningsForMonth(
      monthDetail,
      hourlyRate,
      commission,
      tax,
      nonCommissionedHours
    );

    const currentMonthStatistics = getEarningsForMonth(
      currentMonthDetail,
      hourlyRate,
      commission,
      tax,
      nonCommissionedHours
    );

    const lastMonthStatistics = getEarningsForMonth(
      lastMonthDetail,
      hourlyRate,
      commission,
      tax,
      nonCommissionedHours
    );
    const nextMonthStatistics = getEarningsForMonth(
      nextMonthDetail,
      hourlyRate,
      commission,
      tax,
      nonCommissionedHours
    );

    return {
      nonCommissionedHours,
      setNonCommissionedHours,
      monthStatistics,
      currentMonthStatistics,
      lastMonthStatistics,
      nextMonthStatistics,
      nextPayDayStatistics: new Date().getDate() > 20 ? currentMonthStatistics : lastMonthStatistics
    };
  }, [user, nonCommissionedHours, monthDetail, userSalaryDetails]);

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
