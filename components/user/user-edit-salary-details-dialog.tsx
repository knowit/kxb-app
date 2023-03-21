"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { User } from "@/types";
import { useState } from "react";
import { Icons } from "../icons";
import { UserSalaryDetailsForm } from "./user-salary-details-form";

export function UserEditSalaryDetailsDialog({
  user,
  closeDialogOnFormSubmitSuccess = false
}: {
  user: User;
  closeDialogOnFormSubmitSuccess?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="gap-3" variant="subtle">
          <Icons.Gear className="h-4 w-4" />
          Edit salary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit salary details</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <UserSalaryDetailsForm
          user={{
            commission: user.commission,
            hourlyRate: user.hourlyRate,
            tax: user.tax,
            workHours: user.workHours,
            id: +user.id
          }}
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
