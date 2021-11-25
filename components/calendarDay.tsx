import { Box, Card, IconButton, Overlay, Svg } from "@/components/ui";
import { UserWorkDayDetails, useUser } from "@/components/user";
import { getUserWorkDayDetails } from "@/logic/userLogic";
import { CalendarDay as CalendarDayType, UserWorkDayDetail, WithChildren } from "@/types";
import { AnimateSharedLayout, motion } from "framer-motion";
import * as React from "react";
import { HiChevronDoubleUp, HiOutlineX } from "react-icons/hi";
import { IoBugOutline } from "react-icons/io5";
import { CSS, styled } from "stitches.config";

type BaseDay = {
  isWorkDay?: boolean;
  isNonCommissionedToggled?: boolean;
  isExtraHoursToggled?: boolean;
  isSickDayToggled?: boolean;
};

type CalendarDayDateProps = WithChildren<{
  layoutId?: string;
  as?: React.ElementType;
  className?: string;
  isExpanded?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  css?: CSS;
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

  fontWeight: "bold",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "transparent",
  borderRadius: "$round",
  transition: "border-color 0.2s ease-in-out",
  variants: {
    expanded: {
      true: {
        height: "auto",
        width: "auto",
        mb: "$2",
        border: "none",
        fontSize: "$4"
      },
      false: {
        height: "$6",
        width: "$6",
        justifyContent: "center",
        alignItems: "center"
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
      css: {
        "&:hover": {
          borderColor: "$green"
        }
      }
    },
    {
      expanded: false,
      nonCommissioned: true,
      css: {
        "&:hover": {
          borderColor: "$red"
        }
      }
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
  isSickDayToggled,
  isExpanded = false,
  ...other
}: CalendarDayDateProps) => {
  const Component = as ?? motion.div;

  const boxCss: CSS = isExpanded
    ? {
        display: "block"
      }
    : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer"
      };

  return (
    <Box as={as} css={boxCss} {...other}>
      <DayText workDay={isWorkDay} nonCommissioned={isNonCommissionedToggled} expanded={isExpanded}>
        {children}
        {isExtraHoursToggled ? <Svg as={HiChevronDoubleUp} variant="green" size="2" /> : null}
        {isSickDayToggled ? <Svg as={IoBugOutline} variant="red" size="2" /> : null}
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
  return (
    <Box>
      <Box
        as={motion.div}
        layoutId="expandable-card"
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 20,
          maxWidth: "270px",
          mx: "auto",
          my: "$4"
        }}
        {...other}
      >
        <IconButton
          as={motion.button}
          variant="green"
          transition={{ delay: 0.3 }}
          initial={{ opacity: 0, top: "-4rem" }}
          animate={{ opacity: 1, top: "-0.875rem" }}
          onClick={() => onCollapse()}
          css={{
            position: "absolute",
            right: "-$3",
            borderRadius: "$round",
            zIndex: 1
          }}
        >
          <Svg as={HiOutlineX} size="2" />
        </IconButton>
        <Card padding="medium">
          <CalendarDayDate
            isWorkDay={isWorkDay}
            isNonCommissionedToggled={isNonCommissionedToggled}
            isExpanded
          >
            {day?.formattedShortDate}
          </CalendarDayDate>
          <UserWorkDayDetails day={day} />
        </Card>
      </Box>
    </Box>
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

  const isSickDayToggled = React.useMemo(
    () => (workDayDetails?.sickDay ?? false) && isNonCommissionedToggled,
    [workDayDetails?.sickDay, isNonCommissionedToggled]
  );

  return (
    <AnimateSharedLayout>
      {isExpanded ? (
        <>
          <Overlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => collapseDate()}
            css={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "$overlay",
              transition: "opacity 0.2s ease-in-out",
              zIndex: "10",
              borderRadius: "$4"
            }}
          />
          <ExpandedCalendarDay
            day={day}
            isWorkDay={isWorkDay}
            isNonCommissionedToggled={isNonCommissionedToggled}
            workDayDetails={workDayDetails}
            isExtraHoursToggled={isExtraHoursToggled}
            onCollapse={collapseDate}
            {...other}
          />
        </>
      ) : (
        <RegularCalendarDay
          day={day}
          isWorkDay={isWorkDay}
          isNonCommissionedToggled={isNonCommissionedToggled}
          isExtraHoursToggled={isExtraHoursToggled}
          isSickDayToggled={isSickDayToggled}
          onExpand={expandDate}
          {...other}
        />
      )}
    </AnimateSharedLayout>
  );
};

export default CalendarDay;
