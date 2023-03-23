"use client";

import { CalendarDay as CalendarDayType, CalendarEntries, CalendarSizeVariant } from "@/types";
import { useState } from "react";
import { CalendarDay } from "../calendar/calendar-day";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { UserWorkDayDetailForm } from "./user-work-day-detail-form";

export function UserEditWorkDayDetailDialog({
  calendarDay,
  calendarSizeVariant = "default",
  holidayInfos = [],
  closeDialogOnFormSubmitSuccess = false,
  ...other
}: {
  calendarDay: CalendarEntries;
  calendarSizeVariant?: CalendarSizeVariant;
  holidayInfos?: CalendarDayType[];
  closeDialogOnFormSubmitSuccess?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)} {...other}>
      <DialogTrigger asChild>
        <CalendarDay
          className="cursor-pointer"
          calendarDay={calendarDay}
          calendarSizeVariant={calendarSizeVariant}
          holidayInfos={holidayInfos}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{calendarDay.formattedDate}</DialogTitle>
        <DialogDescription>Edit work day details</DialogDescription>
        <UserWorkDayDetailForm
          calendarDay={calendarDay}
          userWorkDayDetail={calendarDay.workDayDetails}
          onFormSubmitSuccess={() => {
            if (closeDialogOnFormSubmitSuccess) {
              setIsOpen(false);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
