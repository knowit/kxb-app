import CalendarDay from "@/components/calendarDay";
import Container from "@/components/container";
import Heading from "@/components/heading";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { useUser } from "@/components/user";
import EARNING_CONSTANTS from "@/constants/earningConstants";
import { useCalendar } from "@/utils/calendarProvider";
import { omit } from "@/utils/commonUtils";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { useToggle } from "react-use";

export default function Calendar({ salaryStatistics, ...other }) {
  const { user, update } = useUser();
  const { yearName, monthDetail, years, setYear, incrementMonth, decrementMonth } = useCalendar();

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
    <Container className="w-full select-none" {...other}>
      <div className="flex justify-between items-center mb-3">
        <div
          className="cursor-pointer"
          onClick={() => {
            toggleYearPicker(false);
            decrementMonth();
          }}
        >
          <ChevronLeft />
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
          <ChevronRight />
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
            text={day.day}
            isWorkDay={day.isWorkDay}
            isNonCommissionedToggled={
              user?.workDayDetails?.[day.formattedDate]?.nonCommissionedHours > 0
            }
            onClick={() => {
              if (day.isWorkDay) {
                console.log(day.formattedDate);
                update(
                  user?.workDayDetails?.[day.formattedDate]
                    ? { workDayDetails: omit(user.workDayDetails, [day.formattedDate]) }
                    : {
                        workDayDetails: {
                          ...(user.workDayDetails ?? {}),
                          [day.formattedDate]: {
                            nonCommissionedHours: EARNING_CONSTANTS.WORK_HOURS_PER_DAY,
                            extraHours: 0
                          }
                        }
                      }
                );
              }
            }}
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
}
