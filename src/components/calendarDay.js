import styled from "@emotion/styled";
import * as React from "react";
import { isWorkDay } from "../logic/calendarLogic";
import { Box } from "./box";

const StyledCalendarDay = styled(Box)`
  color: ${props => (props.isWorkDay ? props.theme.colors.text300 : props.theme.colors.bg200)};
`;

export default function CalendarDay({ day, ...other }) {
  return (
    <StyledCalendarDay
      isWorkDay={isWorkDay(day)}
      p={1}
      fontSize={5}
      textAlign="center"
      height={["2.5rem", "3rem"]}
      width={["2.5rem", "3rem"]}
      lineHeight={["2.5rem", "3rem"]}
      flexBasis={7 / 12}
      {...other}
    >
      {day?.day}
    </StyledCalendarDay>
  );
}
