import { getPayDay } from "@/logic/calendarLogic";
import { getMonthNames, getThisYearAndTwoYearsIntoTheFuture } from "@/logic/dateLogic";
import { fetcher } from "@/utils/fetcher";
import * as React from "react";
import useSWR from "swr";

const CalendarContext = React.createContext();
CalendarContext.displayName = "CalendarContext";

const now = new Date();

const initialState = {
  year: now.getFullYear(),
  month: now.getMonth()
};

const getLastMonth = (month, year, lastYear) =>
  month === 0 ? lastYear?.months?.[11] : year?.months?.[month - 1];
const getNextMonth = (month, year, nextYear) =>
  month === 11 ? nextYear?.months?.[0] : year?.months?.[month + 1];

const getDateFromYearDataAndMonth = (year, month) => {
  const now = new Date();
  return new Date(year?.year ?? now.getFullYear(), month ?? now.getMonth(), 1);
};

function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_YEAR": {
      return { ...state, year: action.year };
    }
    case "SET_MONTH": {
      return { ...state, month: action.month };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CalendarProvider({
  children,
  initialData = initialState.initialData,
  year = initialState.year,
  month = initialState.month
}) {
  const [state, dispatch] = React.useReducer(calendarReducer, { year, month });

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_CALENDAR_API_BASE_URL}api/calendar/${state.year}/months`,
    fetcher,
    {
      initialData: initialData
    }
  );

  const { data: lastYear } = useSWR(
    () => `${process.env.NEXT_PUBLIC_CALENDAR_API_BASE_URL}api/calendar/${+data.year - 1}/months`,
    fetcher
  );

  const { data: nextYear } = useSWR(
    () => `${process.env.NEXT_PUBLIC_CALENDAR_API_BASE_URL}api/calendar/${+data.year + 1}/months`,
    fetcher
  );

  const setYear = year => dispatch({ type: "SET_YEAR", year: year });
  const incrementYear = () => dispatch({ type: "SET_YEAR", year: state.year + 1 });
  const decrementYear = () => dispatch({ type: "SET_YEAR", year: state.year - 1 });

  const setMonth = month => dispatch({ type: "SET_MONTH", month: month });
  const incrementMonth = () => {
    const newMonth = state.month + 1;
    const shouldIncrementYear = newMonth > 11;

    if (shouldIncrementYear) {
      incrementYear();
    }

    dispatch({ type: "SET_MONTH", month: shouldIncrementYear ? 0 : newMonth });
  };

  const decrementMonth = () => {
    const newMonth = state.month - 1;
    const shouldDecrementYear = newMonth < 0;

    if (shouldDecrementYear) {
      decrementYear();
    }

    dispatch({ type: "SET_MONTH", month: shouldDecrementYear ? 11 : newMonth });
  };

  React.useEffect(() => {
    setYear(year);
    setMonth(month);
  }, [year, month]);

  const value = React.useMemo(() => {
    const currentMonth = new Date().getMonth();

    const date = getDateFromYearDataAndMonth(state.year, state.month);
    const monthNames = getMonthNames();

    const monthDetail = {
      ...data?.months?.[date.getMonth()],
      payDay: getPayDay(getNextMonth(date.getMonth(), data, nextYear))
    };

    const nextMonthDetail = {
      ...getNextMonth(currentMonth, data, nextYear),
      payDay: getPayDay(
        currentMonth === 11
          ? nextYear?.months?.[1]
          : currentMonth === 10
          ? nextYear?.months?.[0]
          : data?.months?.[currentMonth + 2]
      )
    };

    const currentMonthDetail = {
      ...data?.months?.[currentMonth],
      payDay: getPayDay(nextMonthDetail)
    };

    const lastMonthDetail = {
      ...getLastMonth(currentMonth, data, lastYear),
      payDay: getPayDay(currentMonthDetail)
    };

    return {
      year: data,
      lastYear,
      nextYear,
      yearName: state.year,
      months: monthNames,
      years: getThisYearAndTwoYearsIntoTheFuture(),
      month: state.month,
      monthDetail,
      currentMonthDetail,
      lastMonthDetail,
      nextMonthDetail,
      setYear,
      incrementYear,
      decrementYear,
      incrementMonth,
      decrementMonth,
      date,
      isLoadingCalendar: !data
    };
  }, [data, lastYear, nextYear, state, dispatch]);

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}
function useCalendar() {
  const context = React.useContext(CalendarContext);

  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }

  return context;
}
export { CalendarProvider, useCalendar };
