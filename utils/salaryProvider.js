import * as React from "react";
import { getWorkDays } from "../logic/calendarLogic";
import { getGrossIncome, getNetIncome, getWorkHours } from "../logic/earningsLogic";
import { useCalendar } from "./calendarProvider";

const initialState = {
  workHoursPerDay: 7.5,
  hourlyRate: 1300,
  commission: 0.48,
  tax: 0.39,
  nonCommissionedHours: 0
};

function salaryReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_WORK_HOURS_PER_DAY": {
      return { ...state, workHoursPerDay: action.workHoursPerDay };
    }
    case "SET_HOURLY_RATE": {
      return { ...state, hourlyRate: action.hourlyRate };
    }
    case "SET_COMMISSION": {
      return { ...state, commission: action.commission };
    }
    case "SET_TAX": {
      return { ...state, tax: action.tax };
    }
    case "SET_NON_COMMISSIONED_HOURS": {
      return { ...state, nonCommissionedHours: action.nonCommissionedHours };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const SalaryContext = React.createContext();
SalaryContext.displayName = "SalaryContext";

function SalaryProvider({ children }) {
  const [state, dispatch] = React.useReducer(salaryReducer, initialState);
  const { year, monthDetail, date } = useCalendar();

  const workDays = React.useMemo(() => getWorkDays(monthDetail), [monthDetail]);

  const workHours = React.useMemo(
    () => getWorkHours(state.workHoursPerDay, workDays.length, state.nonCommissionedHours),
    [state.workHoursPerDay, workDays, state.nonCommissionedHours]
  );

  const gross = React.useMemo(() => getGrossIncome(workHours, state.hourlyRate, state.commission), [
    workHours,
    state.hourlyRate,
    state.commission
  ]);

  const net = React.useMemo(() => getNetIncome(gross, state.tax), [gross, state.tax]);

  const value = React.useMemo(
    () => ({
      ...state,
      setWorkHoursPerDay: value =>
        dispatch({ type: "SET_WORK_HOURS_PER_DAY", workHoursPerDay: value }),
      setHourlyRate: value => dispatch({ type: "SET_HOURLY_RATE", hourlyRate: value }),
      setCommission: value => dispatch({ type: "SET_COMMISSION", commission: value }),
      setTax: value => dispatch({ type: "SET_TAX", tax: value }),
      setNonCommissionedHors: value =>
        dispatch({ type: "SET_NON_COMMISSIONED_HOURS", nonCommissionedHours: value }),
      workDays,
      workHours,
      gross,
      net
    }),
    [state, workDays, workHours, gross, net]
  );

  return <SalaryContext.Provider value={value}>{children}</SalaryContext.Provider>;
}
function useSalary() {
  const context = React.useContext(SalaryContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a SalaryProvider");
  }
  return context;
}
export { SalaryProvider, useSalary };
