import * as React from "react";
import CalendarDay from "./calendarDay";
import Container from "./container";
import Flex from "./flex";

export default function CalendarMonth({ month, width = "sm", ...other }) {
  const renderSpacingDays = days => {
    if (days?.length <= 0) {
      return null;
    }

    const spacingDaysToRender = {
      mandag: 0,
      tirsdag: 1,
      onsdag: 2,
      torsdag: 3,
      fredag: 4,
      lørdag: 5,
      søndag: 6
    };

    return [...Array(spacingDaysToRender[days[0].name] ?? 0)].map((key, index) => (
      <CalendarDay key={`calendar-day-spacing-${index}`} />
    ));
  };

  return (
    <Container width={width} {...other}>
      <Flex noMargin noPadding>
        {renderSpacingDays(month?.days)}
        {month?.days?.map((day, i) => (
          <CalendarDay key={`calendar-day-${i}`} day={day} />
        ))}
      </Flex>
    </Container>
  );
}
