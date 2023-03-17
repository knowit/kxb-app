"use client";

import { CalendarDay as CalendarDayType, CalendarEntries } from "@/types";
import { CalendarDay } from "../calendar/calendar-day";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { UserWorkDayDetailForm } from "./user-work-day-detail-form";

export function UserEditWorkDayDetailDialog({
  calendarDay,
  big = false,
  holidayInfos = [],
  ...other
}: {
  calendarDay: CalendarEntries;
  big?: boolean;
  holidayInfos?: CalendarDayType[];
}) {
  return (
    <Dialog {...other}>
      <DialogTrigger asChild>
        <CalendarDay
          className="cursor-pointer"
          calendarDay={calendarDay}
          big={big}
          holidayInfos={holidayInfos}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{calendarDay.formattedDate}</DialogTitle>
        <DialogDescription>Edit work day details</DialogDescription>
        <UserWorkDayDetailForm
          date={calendarDay.formattedDate}
          userWorkDayDetail={calendarDay.workDayDetails}
        />
      </DialogContent>
    </Dialog>
  );
}
