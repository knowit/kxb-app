import { UserWorkDayDetails, useUser } from "@/components/user";
import { getUserWorkDayDetails } from "@/logic/userLogic";
import { CalendarDay as CalendarDayType, UserWorkDayDetail, WithChildren } from "@/types";
import { AnimateSharedLayout, motion } from "framer-motion";
import * as React from "react";
import { HiChevronDoubleUp, HiOutlineX } from "react-icons/hi";
import { useClickAway } from "react-use";
import { styled } from "stitches.config";
import { Box, Svg } from "./ui";

type BaseDay = {
  isWorkDay?: boolean;
  isNonCommissionedToggled?: boolean;
  isExtraHoursToggled?: boolean;
};

type CalendarDayDateProps = WithChildren<{
  layoutId?: string;
  as?: React.ElementType;
  className?: string;
  isExpanded?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> &
  BaseDay;

type RegularCalendarDayProps = {
  day: CalendarDayType;
  onExpand: () => void;
} & BaseDay;

type ExpandedCalendarDayProps = {
  day: CalendarDayType;
  workDayDetails: UserWorkDayDetail;
  onCollapse: () => void;
} & BaseDay;

type CalendarDayProps = {
  day: CalendarDayType;
  isWorkDay?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
};

const DayText = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  variants: {
    expanded: {
      true: {
        height: "auto",
        width: "auto"
      }
    },
    workDay: {
      true: {
        color: "$green"
      }
    },
    nonCommissioned: {
      true: {
        color: "$red"
      }
    }
  },
  compoundVariants: [
    {
      expanded: false,
      workDay: true,
      css: {}
    }
  ]
});

const CalendarDayDate = ({
  children,
  as = motion.div,
  className,
  isWorkDay,
  isNonCommissionedToggled,
  isExtraHoursToggled,
  isExpanded = false,
  ...other
}: CalendarDayDateProps) => {
  const Component = as ?? motion.div;

  return (
    <Box
      as={as}
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: isExpanded ? "default" : "pointer"
      }}
      {...other}
    >
      <DayText
        // className={clsx(
        //   "flex justify-center items-center font-bold transition-colors duration-300",
        //   {
        //     "w-10 h-10 border border-transparent rounded-full group-hover:border-white":
        //       !isExpanded,
        //     "text-green-500 dark:text-green-400 ": isWorkDay,
        //     "text-red-500 dark:text-red-400": isNonCommissionedToggled,
        //     "group-hover:border-green-500 dark:group-hover:border-green-400":
        //       !isExpanded && isWorkDay,
        //     "group-hover:border-red-500 dark:group-hover:border-red-400":
        //       !isExpanded && isNonCommissionedToggled
        //   }
        // )}
        workDay={isWorkDay}
        nonCommissioned={isNonCommissionedToggled}
        expanded={isExpanded}
      >
        {children}
        {isExtraHoursToggled ? <Svg as={HiChevronDoubleUp} variant="green" size="2" /> : null}
      </DayText>
    </Box>
  );
};

const RegularCalendarDay = ({
  day,
  isWorkDay = false,
  isNonCommissionedToggled = false,
  onExpand = () => {},
  ...other
}: RegularCalendarDayProps) => {
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
}: ExpandedCalendarDayProps) => {
  const ref = React.useRef(null);

  useClickAway(ref, () => onCollapse());

  return (
    <div ref={ref}>
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
          <HiOutlineX className="text-black" />
        </motion.button>
        <div className="flex flex-col w-full h-full items-start p-4">
          <CalendarDayDate
            className="text-xl md:text-2xl"
            isWorkDay={isWorkDay}
            isNonCommissionedToggled={isNonCommissionedToggled}
            isExpanded
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

const CalendarDay = ({
  day,
  isWorkDay = false,
  onExpand = () => {},
  onCollapse = () => {},
  ...other
}: CalendarDayProps) => {
  const { user } = useUser();

  const [isExpanded, setIsExpanded] = React.useState(false);

  const collapseDate = () => {
    setIsExpanded(false);
    onCollapse();
  };

  const expandDate = () => {
    setIsExpanded(true);
    onExpand();
  };

  const workDayDetails = React.useMemo(
    () => getUserWorkDayDetails(user, day?.formattedDate),
    [user, day?.formattedDate]
  );

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
};

export default CalendarDay;
