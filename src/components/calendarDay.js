import styled from "@emotion/styled";
import * as React from "react";
import { isWorkDay } from "../logic/calendarLogic";

const StyledCalendarDay = styled.div`
  font-size: 2.4rem;
  padding: 0.5rem;
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
  color: ${props => (props.isWorkDay ? props.theme.colors.text300 : props.theme.colors.bg200)};
`;

export default function CalendarDay({ day, ...other }) {
  return (
    <StyledCalendarDay isWorkDay={isWorkDay(day)} {...other}>
      {day?.day}
    </StyledCalendarDay>
  );
}
