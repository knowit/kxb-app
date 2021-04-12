// src/count-context.js
import * as React from "react";
import useSWR, { mutate } from "swr";
import {
  getFormattedMonth,
  getMonthNames,
  getThisYearAndTwoYearsIntoTheFuture
} from "../logic/dateLogic";
import fetcher from "./fetcher";

const CalendarContext = React.createContext();
CalendarContext.displayName = "CalendarContext";

const now = new Date();

const initialState = {
  year: now.getFullYear(),
  month: now.getMonth(),
  prefetchYear: now.getFullYear()
};

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
    `https://tommy-api.vercel.app/api/calendar/${state.year}/months`,
    fetcher,
    {
      initialData: initialData
    }
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

  const prefetchYear = async year => {
    const key = `https://tommy-api.vercel.app/api/calendar/${year}/months`;
    const data = await fetcher(key);
    mutate(key, data, false);
  };

  React.useEffect(() => {
    setYear(year);
    setMonth(month);
  }, [year, month]);

  const value = React.useMemo(() => {
    const date = getDateFromYearDataAndMonth(state.year, state.month);
    const monthNames = getMonthNames();

    return {
      year: data,
      yearName: state.year,
      months: monthNames,
      years: getThisYearAndTwoYearsIntoTheFuture(),
      month: state.month,
      monthDetail: data?.months?.[date.getMonth() ?? 0],
      monthName: getFormattedMonth(date),
      setYear,
      incrementYear,
      decrementYear,
      incrementMonth,
      decrementMonth,
      prefetchYear,
      date
    };
  }, [data, state, dispatch]);

  if (!data) {
    return <div>Loading...</div>;
  }

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
