import { motion } from "framer-motion";
import * as React from "react";
import { useToggle } from "react-use";
import { useCalendar } from "../utils/calendarProvider";
import CalendarDay from "./calendarDay";
import Container from "./container";
import Heading from "./heading";

export default function CalendarMonth({ title, month, ...other }) {
  const { yearName, monthName, years, setYear, incrementMonth, decrementMonth } = useCalendar();
  const [showYearPicker, toggleYearPicker] = useToggle(false);

  const renderSpacingDays = days => {
    if (days === null || days === undefined || days?.length <= 0) {
      return null;
    }

    const spacingDaysToRender = {
      MONDAY: 0,
      TUESDAY: 1,
      WEDNESDAY: 2,
      THURSDAY: 3,
      FRIDAY: 4,
      SATURDAY: 5,
      SUNDAY: 6
    };

    return [...Array(spacingDaysToRender[days[0].name?.toUpperCase()] ?? 0)].map((key, index) => (
      <CalendarDay key={`calendar-day-spacing-${index}`} />
    ));
  };

  return (
    <Container className="w-full" {...other}>
      <div className="flex justify-between items-center mb-3">
        <div
          className="cursor-pointer"
          onClick={() => {
            toggleYearPicker(false);
            decrementMonth();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <Heading className="mb-0" as="h2" onClick={toggleYearPicker}>
          {`${monthName} ${yearName}`}
        </Heading>
        <div
          className="p-2 cursor-pointer"
          onClick={() => {
            toggleYearPicker(false);
            incrementMonth();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <div className="relative grid grid-cols-7 gap-1 max-w-lg shadow-lg rounded-lg h-72 bg-gray-800">
        {renderSpacingDays(month?.days)}
        {month?.days?.map((day, i) => (
          <CalendarDay key={`calendar-day-${i}`} day={day} />
        ))}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 rounded-lg"
          initial={showYearPicker ? "open" : "collapsed"}
          animate={showYearPicker ? "open" : "collapsed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto"
            },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{
            ease: "easeOut"
          }}
        >
          <div className="grid grid-cols-3 p-2 items-center h-full">
            {years.map(year => (
              <div
                key={year}
                onClick={() => {
                  setYear(year);
                  toggleYearPicker();
                }}
                className="cursor-pointer p-2 text-xl text-center"
              >
                {year}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
