"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Link } from "@/components/ui/link";
import { UserSalaryDetailsForm } from "@/components/user/user-salary-details-form";
import { User } from "@/types";
import { useState } from "react";

function UserEditSalaryDetailsDialog({
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
            Make changes to your salary details here. Click save when you&apos;re done. You can view
            your{" "}
            <Link className="underline underline-offset-2" href="/dashboard/profile">
              profile here
            </Link>
            .
          </DialogDescription>
        </DialogHeader>
        <UserSalaryDetailsForm
          user={{
            commission: user.commission,
            hourlyRate: user.hourlyRate,
            tax: user.tax,
            workHours: user.workHours,
            id: +user.id,
            taxTable: user.taxTable
          }}
          onFormSubmitSuccess={() => {
            if (closeDialogOnFormSubmitSuccess) {
              setIsOpen(false);
            }
          }}
          variant="dialog"
        />
      </DialogContent>
    </Dialog>
  );
}

const UserEditSalaryDetailsDialogTriggerSkeleton = () => {
  return (
    <Button className="gap-3" variant="subtle">
      <Icons.Gear className="h-4 w-4" />
      Edit salary
    </Button>
  );
};

export { UserEditSalaryDetailsDialog, UserEditSalaryDetailsDialogTriggerSkeleton };
