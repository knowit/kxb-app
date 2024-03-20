"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Link } from "@/components/ui/link";
import { UserSalaryDetailsForm } from "@/components/user/user-salary-details-form";
import { useState } from "react";
import { SelectUser } from "../../lib/db/schema";

export const UserEditSalaryDetailsDialog = ({
  user,
  closeDialogOnFormSubmitSuccess = false
}: {
  user: SelectUser;
  closeDialogOnFormSubmitSuccess?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="gap-3" variant="outline">
          <Icons.Gear className="h-4 w-4" />
          Edit salary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Edit salary details</DialogTitle>
        <DialogDescription>
          Make changes to your salary details here. Click save when you&apos;re done. You can view
          your{" "}
          <Link className="underline underline-offset-2" href="/dashboard/profile">
            profile here
          </Link>
          .
        </DialogDescription>
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
};

export const UserEditSalaryDetailsDialogTriggerSkeleton = () => {
  return (
    <Button className="gap-3" variant="subtle">
      <Icons.Gear className="h-4 w-4" />
      Edit salary
    </Button>
  );
};
