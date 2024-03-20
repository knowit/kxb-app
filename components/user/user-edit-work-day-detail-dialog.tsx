"use client";

import { CalendarDay } from "@/components/calendar/calendar-day";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { UserWorkDayDetailForm } from "@/components/user/user-work-day-detail-form";
import { CalendarDay as CalendarDayType, CalendarEntries, CalendarSizeVariant } from "@/types";
import { useState } from "react";
import { SelectUser } from "../../lib/db/schema";

function UserEditWorkDayDetailDialog({
  user,
  calendarDay,
  calendarSizeVariant = "default",
  holidayInfos = [],
  closeDialogOnFormSubmitSuccess = false,
  ...other
}: {
  user: SelectUser;
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
          user={user}
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

export { UserEditWorkDayDetailDialog };
