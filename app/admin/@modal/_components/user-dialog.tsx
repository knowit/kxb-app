"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types";
import { useRouter } from "next/navigation";

function UserDialog({ user }: { user: Omit<User, "workDayDetails" | "feedback"> }) {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={open => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>{user.name}</DialogHeader>
        <DialogDescription>User</DialogDescription>
        <div>
          <div className="w-full max-w-[400px]">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={user.name} className="w-full" disabled />
          </div>
          <div className="w-full max-w-[400px]">
            <Label htmlFor="activeDirectoryId">Active Directory Id</Label>
            <Input
              id="activeDirectoryId"
              value={user.activeDirectoryId}
              className="w-full"
              disabled
            />
          </div>
          <div className="w-full max-w-[400px]">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} className="w-full" disabled />
          </div>
          <div className="w-full max-w-[400px]">
            <Label htmlFor="created">Created</Label>
            <Input
              id="created"
              type="datetime-local"
              value={new Date(user.created).toISOString().slice(0, 16)}
              className="w-full"
              disabled
            />
          </div>
          <div className="w-full max-w-[400px]">
            <Label htmlFor="updated">Updated</Label>
            <Input
              id="updated"
              type="datetime-local"
              value={new Date(user.updated).toISOString().slice(0, 16)}
              className="w-full"
              disabled
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Label htmlFor="admin">Admin</Label>
              <Checkbox id="admin" checked={user.isAdmin} disabled />
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="consultant">Consultant</Label>
              <Checkbox id="consultant" checked={user.isSpecialist} disabled />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { UserDialog };
