import { Cross, DoubleChevronUp } from "@/components/icons/svgs/hero";
import { UserWorkDayDetails } from "@/components/user";
import clsx from "clsx";
import { AnimateSharedLayout, motion } from "framer-motion";
import * as React from "react";

const CalendarDayDate = ({
  children,
  as = motion.div,
  className,
  isWorkDay,
  isNonCommissionedToggled,
  isExtraHoursToggled,
  ...other
}) => {
  const Component = as ?? motion.div;

  return (
    <Component
      className={clsx(
        "flex justify-center items-center p-2 cursor-pointer transition-colors duration-300",
        {
          "text-green-500 dark:text-green-400 font-bold": isWorkDay,
          "text-red-500 dark:text-red-400 font-bold": isNonCommissionedToggled
        },
        className
      )}
      {...other}
    >
      {children}
      {isExtraHoursToggled ? (
        <DoubleChevronUp className="!text-green-500 !dark:text-green-400" size="sm" />
      ) : null}
    </Component>
  );
};

const RegularCalendarDay = ({
  day,
  isWorkDay = false,
  isNonCommissionedToggled = false,
  onExpand = () => {},
  ...other
}) => {
  return (
    <CalendarDayDate
      layoutId="expandable-card"
      isWorkDay={isWorkDay}
      isNonCommissionedToggled={isNonCommissionedToggled}
      onClick={() => onExpand()}
      {...other}
    >
      {day?.day}
    </CalendarDayDate>
  );
};

const ExpandedCalendarDay = ({
  day,
  isWorkDay = false,
  isNonCommissionedToggled = false,
  workDayDetails,
  onCollapse = () => {},
  ...other
}) => {
  return (
    <div>
      <motion.div
        className="bg-white dark:bg-gray-900 flex flex-col justify-center items-center rounded-lg absolute top-0 left-0 right-0 bottom-0 my-6 lg:my-8 z-20 max-w-[18rem] lg:max-w-xs mx-auto"
        layoutId="expandable-card"
        {...other}
      >
        <motion.button
          className="bg-green-500 dark:bg-green-400 text-black flex justify-center items-center -right-3.5 rounded-full content-center text-center absolute w-8 h-8 cursor-pointer"
          transition={{ delay: 0.3 }}
          initial={{ opacity: 0, top: "-4rem" }}
          animate={{ opacity: 1, top: "-0.875rem" }}
          onClick={() => onCollapse()}
        >
          <Cross color="black" />
        </motion.button>
        <div className="flex flex-col w-full h-full items-start p-4">
          <CalendarDayDate
            className="text-xl md:text-2xl"
            isWorkDay={isWorkDay}
            isNonCommissionedToggled={isNonCommissionedToggled}
          >
            {day?.formattedShortDate}
          </CalendarDayDate>
          <div className="p-2">
            <UserWorkDayDetails day={day} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function CalendarDay({
  day,
  isWorkDay = false,
  workDayDetails = {
    nonCommissionedHours: 0,
    extraHours: 0
  },
  onExpand = () => {},
  onCollapse = () => {},
  ...other
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const collapseDate = () => {
    setIsExpanded(false);
    onCollapse();
  };

  const expandDate = () => {
    setIsExpanded(true);
    onExpand();
  };

  const isNonCommissionedToggled = React.useMemo(
    () => workDayDetails?.nonCommissionedHours > 0,
    [workDayDetails.nonCommissionedHours]
  );

  const isExtraHoursToggled = React.useMemo(
    () => workDayDetails?.extraHours > 0,
    [workDayDetails.extraHours]
  );

  return (
    <AnimateSharedLayout>
      {isExpanded ? (
        <ExpandedCalendarDay
          day={day}
          isWorkDay={isWorkDay}
          isNonCommissionedToggled={isNonCommissionedToggled}
          workDayDetails={workDayDetails}
          isExtraHoursToggled={isExtraHoursToggled}
          onCollapse={collapseDate}
          {...other}
        />
      ) : (
        <RegularCalendarDay
          day={day}
          isWorkDay={isWorkDay}
          isNonCommissionedToggled={isNonCommissionedToggled}
          isExtraHoursToggled={isExtraHoursToggled}
          onExpand={expandDate}
          {...other}
        />
      )}
    </AnimateSharedLayout>
  );
}
