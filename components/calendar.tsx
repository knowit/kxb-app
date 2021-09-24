import CalendarDay from "@/components/calendarDay";
import Container from "@/components/container";
import Heading from "@/components/heading";
import { useUser } from "@/components/user";
import { CalendarDay as CalendarDayType } from "@/types";
import { useCalendar } from "@/utils/calendarProvider";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useToggle } from "react-use";

const Calendar = ({ ...other }) => {
  const { user } = useUser();
  const { yearName, monthDetail, years, setYear, incrementMonth, decrementMonth } = useCalendar();

  const [toggledDay, setToggledDay] = React.useState<CalendarDayType>();

  const [showYearPicker, toggleYearPicker] = useToggle(false);

  const renderSpacingDays = (days: CalendarDayType[]): JSX.Element[] | null => {
    if (days === null || days === undefined || days?.length <= 0) {
      return null;
    }

    const spacingDaysToRender: Record<string, number> = {
      MONDAY: 0,
      TUESDAY: 1,
      WEDNESDAY: 2,
      THURSDAY: 3,
      FRIDAY: 4,
      SATURDAY: 5,
      SUNDAY: 6
    };

    return [...Array(spacingDaysToRender[days[0].name?.toUpperCase()] ?? 0)].map((key, index) => (
      <div key={`calendar-day-spacing-${index}`} />
    ));
  };

  return (
    <Container className="relative w-full select-none" {...other}>
      <div className="flex justify-between items-center mb-3">
        <div
          className="cursor-pointer"
          onClick={() => {
            toggleYearPicker(false);
            decrementMonth();
          }}
        >
          <HiChevronLeft className="h-6 w-6" />
        </div>
        <Heading className="!mb-0" as="h2" onClick={toggleYearPicker}>
          {`${monthDetail?.month} ${yearName}`}
        </Heading>
        <div
          className="p-2 cursor-pointer"
          onClick={() => {
            toggleYearPicker(false);
            incrementMonth();
          }}
        >
          <HiChevronRight className="h-6 w-6" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center mx-2 sm:mx-4">
          <div className="h-4 w-4 rounded-full bg-white"></div>
          <div className="text-xs ml-2">Off work</div>
        </div>
        <div className="flex items-center mx-2 sm:mx-4">
          <div className="h-4 w-4 rounded-full bg-green-500 dark:bg-green-400"></div>
          <div className="text-xs ml-2">Work</div>
        </div>
        <div className="flex items-center mx-2 sm:mx-4">
          <div className="h-4 w-4 rounded-full bg-red-500 dark:bg-red-400"></div>
          <div className="text-xs ml-2">Non commissioned</div>
        </div>
      </div>
      <div className="relative grid grid-cols-7 gap-1 max-w-lg rounded-lg h-80 dark:bg-gray-900 my-4 mx-auto">
        {toggledDay ? (
          <motion.div
            className="absolute inset-0 bg-gray-700 bg-opacity-75 transition-opacity z-10 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          ></motion.div>
        ) : null}
        <div className="flex justify-center items-center p-2 text-gray-800 dark:text-gray-400 text-xs">
          mon.
        </div>
        <div className="flex justify-center items-center p-2 text-gray-800 dark:text-gray-400 text-xs">
          tue.
        </div>
        <div className="flex justify-center items-center p-2 text-gray-800 dark:text-gray-400 text-xs">
          wed.
        </div>
        <div className="flex justify-center items-center p-2 text-gray-800 dark:text-gray-400 text-xs">
          thu.
        </div>
        <div className="flex justify-center items-center p-2 text-gray-800 dark:text-gray-400 text-xs">
          fri.
        </div>
        <div className="flex justify-center items-center p-2 text-gray-800 dark:text-gray-400 text-xs">
          sat.
        </div>
        <div className="flex justify-center items-center p-2 text-gray-800 dark:text-gray-400 text-xs">
          sun.
        </div>
        {renderSpacingDays(monthDetail?.days)}
        {monthDetail?.days?.map((day, i) => (
          <CalendarDay
            key={`calendar-day-${i}`}
            day={day}
            isWorkDay={day.isWorkDay}
            onExpand={() => setToggledDay(day)}
            onCollapse={() => setToggledDay(undefined)}
          />
        ))}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 dark:bg-gray-900 rounded-lg"
          initial={showYearPicker ? "open" : "collapsed"}
          animate={showYearPicker ? "open" : "collapsed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto"
            },
            collapsed: {
              opacity: 0,
              height: 0
            }
          }}
          transition={{
            ease: "easeOut"
          }}
        >
          <div className="grid grid-cols-3 p-2 items-center h-full">
            <AnimatePresence exitBeforeEnter>
              {showYearPicker &&
                years.map(year => (
                  <motion.div
                    key={year}
                    onClick={() => {
                      setYear(year);
                      toggleYearPicker();
                    }}
                    exit={{ opacity: 0 }}
                    className="cursor-pointer p-2 text-xl text-center"
                  >
                    {year}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default Calendar;
