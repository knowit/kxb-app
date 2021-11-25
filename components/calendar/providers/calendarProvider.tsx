import { getPayDay } from "@/logic/calendarLogic";
import { CalendarMonth, CalendarYear } from "@/types";
import { getCalendarYear } from "@/utils/calendar/calendarUtils";
import { getThisYearAndTwoYearsIntoTheFuture } from "@/utils/dateUtils";
import * as React from "react";

type CalendarContextProps = {
  isLoadingCalendar: boolean;
  year: CalendarYear;
  lastYear: CalendarYear;
  nextYear: CalendarYear;
  calendarYear: CalendarYear;
  yearName: string;
  years: number[];
  month: number;
  activeCalendarMonthDetail: CalendarMonth;
  currentMonthDetail: CalendarMonth;
  lastMonthDetail: CalendarMonth;
  nextMonthDetail: CalendarMonth;
  setYear: (year: number) => void;
  incrementYear: () => void;
  decrementYear: () => void;
  incrementMonth: () => void;
  decrementMonth: () => void;
  date: Date;
};

const CalendarContext = React.createContext<CalendarContextProps>(null);
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

function CalendarProvider({ children, year = initialState.year, month = initialState.month }) {
  const [state, dispatch] = React.useReducer(calendarReducer, { year, month });

  const calendarYear = React.useMemo(() => getCalendarYear(state.year), [state.year]);

  const currentYear = new Date().getFullYear();
  const data = React.useMemo(() => getCalendarYear(currentYear), [currentYear]);
  const lastYear = React.useMemo(() => getCalendarYear(currentYear - 1), [currentYear]);
  const nextYear = React.useMemo(() => getCalendarYear(currentYear + 1), [currentYear]);
  const setYear = (year: number) => dispatch({ type: "SET_YEAR", year: year });

  const incrementYear = React.useCallback(
    () => dispatch({ type: "SET_YEAR", year: state.year + 1 }),
    [state.year]
  );
  const decrementYear = React.useCallback(
    () => dispatch({ type: "SET_YEAR", year: state.year - 1 }),
    [state.year]
  );

  const setMonth = month => dispatch({ type: "SET_MONTH", month: month });

  const incrementMonth = React.useCallback(() => {
    const newMonth = state.month + 1;
    const shouldIncrementYear = newMonth > 11;

    if (shouldIncrementYear) {
      incrementYear();
    }

    dispatch({ type: "SET_MONTH", month: shouldIncrementYear ? 0 : newMonth });
  }, [incrementYear, state.month]);

  const decrementMonth = React.useCallback(() => {
    const newMonth = state.month - 1;
    const shouldDecrementYear = newMonth < 0;

    if (shouldDecrementYear) {
      decrementYear();
    }

    dispatch({ type: "SET_MONTH", month: shouldDecrementYear ? 11 : newMonth });
  }, [decrementYear, state.month]);

  React.useEffect(() => {
    setYear(year);
    setMonth(month);
  }, [year, month]);

  const calendarValue = React.useMemo<{
    date: Date;
    yearName: string;
    years: number[];
    month: number;
    activeCalendarMonthDetail: CalendarMonth;
    calendarYear: CalendarYear;
  }>(() => {
    const date = getDateFromYearDataAndMonth(state.year, state.month);

    const activeCalendarMonthDetail = {
      ...calendarYear?.months?.[date.getMonth()],
      payDay: getPayDay(
        getNextMonth(date.getMonth(), calendarYear, getCalendarYear(+calendarYear.year + 1))
      )
    };

    return {
      date,
      calendarYear,
      yearName: state.year,
      month: state.month,
      years: getThisYearAndTwoYearsIntoTheFuture(),
      activeCalendarMonthDetail
    };
  }, [calendarYear, state.month, state.year]);

  const value = React.useMemo(() => {
    const currentMonth = new Date().getMonth();

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
      currentMonthDetail,
      lastMonthDetail,
      nextMonthDetail,
      isLoadingCalendar: !data
    };
  }, [data, lastYear, nextYear]);

  return (
    <CalendarContext.Provider
      value={{
        ...value,
        ...calendarValue,
        decrementMonth,
        incrementMonth,
        decrementYear,
        incrementYear,
        setYear
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
function useCalendar() {
  const context = React.useContext(CalendarContext);

  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }

  return context;
}
export { CalendarProvider, useCalendar };
