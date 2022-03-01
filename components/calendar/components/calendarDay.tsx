import {
  Box,
  Dialog,
  DialogContent,
  DialogNonRemoveScrollOverlay,
  DialogTrigger,
  Svg
} from "@/components/ui";
import { UserWorkDayDetails, useUser } from "@/components/user";
import { getUserWorkDayDetails } from "@/logic/userLogic";
import { CalendarDay as CalendarDayType, UserWorkDayDetail, WithChildren } from "@/types";
import { Presence } from "@radix-ui/react-presence";
import * as React from "react";
import { HiChevronDoubleUp } from "react-icons/hi";
import { IoBugOutline } from "react-icons/io5";
import { CSS, styled } from "stitches.config";

type BaseDay = {
  isWorkDay?: boolean;
  isNonCommissionedToggled?: boolean;
  isExtraHoursToggled?: boolean;
  isSickDayToggled?: boolean;
};

type CalendarDayDateProps = WithChildren<{
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

const CalendarDayDate = React.forwardRef<React.ElementRef<typeof Box>, CalendarDayDateProps>(
  function CalendarDayDate(
    {
      children,
      className,
      isWorkDay,
      isNonCommissionedToggled,
      isExtraHoursToggled,
      isSickDayToggled,
      isExpanded = false,
      ...other
    },
    ref
  ) {
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
      <Box css={boxCss} ref={ref} {...other}>
        <DayText
          workDay={isWorkDay}
          nonCommissioned={isNonCommissionedToggled}
          expanded={isExpanded}
        >
          {children}
          {isExtraHoursToggled ? <Svg as={HiChevronDoubleUp} variant="green" size="2" /> : null}
          {isSickDayToggled ? <Svg as={IoBugOutline} variant="red" size="2" /> : null}
        </DayText>
      </Box>
    );
  }
);

const RegularCalendarDay = React.forwardRef<
  React.ElementRef<typeof CalendarDayDate>,
  RegularCalendarDayProps
>(function RegularCalendarDay(
  { day, isWorkDay = false, isNonCommissionedToggled = false, onExpand = () => {}, ...other },
  ref
) {
  return (
    <CalendarDayDate
      isWorkDay={isWorkDay}
      isNonCommissionedToggled={isNonCommissionedToggled}
      onClick={() => onExpand()}
      ref={ref}
      {...other}
    >
      {day?.day}
    </CalendarDayDate>
  );
});

const ExpandedCalendarDay = ({
  day,
  isWorkDay = false,
  isNonCommissionedToggled = false,
  isExtraHoursToggled = false,
  workDayDetails,
  onCollapse = () => {},
  ...other
}: ExpandedCalendarDayProps) => {
  return (
    <Box {...other}>
      <CalendarDayDate
        isWorkDay={isWorkDay}
        isNonCommissionedToggled={isNonCommissionedToggled}
        isExpanded
      >
        {day?.formattedShortDate}
      </CalendarDayDate>
      <UserWorkDayDetails day={day} />
    </Box>
  );
};

const CalendarDay = ({ day, isWorkDay = false, ...other }: CalendarDayProps) => {
  const { user } = useUser();

  const [isExpanded, setIsExpanded] = React.useState(false);

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
    <Dialog
      open={isExpanded}
      onOpenChange={open => setIsExpanded(open)}
      overlayProps={{
        enabled: false
      }}
    >
      <DialogTrigger asChild>
        <RegularCalendarDay
          day={day}
          isWorkDay={isWorkDay}
          isNonCommissionedToggled={isNonCommissionedToggled}
          isExtraHoursToggled={isExtraHoursToggled}
          isSickDayToggled={isSickDayToggled}
          onExpand={() => setIsExpanded(true)}
          {...other}
        />
      </DialogTrigger>
      <Presence present={isExpanded}>
        <DialogNonRemoveScrollOverlay
          variant="absolute"
          data-state={isExpanded ? "open" : "closed"}
        />
      </Presence>
      <DialogContent
        variant="absolute"
        css={{
          width: "90%",
          maxWidth: "270px",
          marginTop: 0
        }}
      >
        <ExpandedCalendarDay
          day={day}
          isWorkDay={isWorkDay}
          isNonCommissionedToggled={isNonCommissionedToggled}
          workDayDetails={workDayDetails}
          isExtraHoursToggled={isExtraHoursToggled}
          onCollapse={() => setIsExpanded(false)}
          {...other}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDay;
