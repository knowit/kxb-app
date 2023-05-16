"use client";

import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Show } from "@/components/ui/show";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { JWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";
import { forwardRef, useState } from "react";

const UserDeleteDialog = forwardRef<
  React.ElementRef<typeof AlertDialogContent>,
  React.ComponentPropsWithoutRef<typeof AlertDialogContent> & { userId: User["id"] | JWT["id"] }
>(({ className, children, userId, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    toast({
      description: "Deleting your account. We will redirect you to the homepage shortly.",
      duration: 5000,
      variant: "success"
    });

    const response = await fetch(`/api/user/${userId}`, {
      method: "DELETE"
    });

    if (!response?.ok) {
      setIsDeleting(false);

      return toast({
        title: "Something went wrong.",
        description: "Could not delete your account. Please try again.",
        variant: "destructive"
      });
    }

    await signOut({ callbackUrl: "/" });
  };
  return (
    <AlertDialog
      open={open || isDeleting}
      onOpenChange={open => {
        if (isDeleting) {
          return;
        }

        setOpen(open);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete me</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={cn("", className)} {...props} ref={ref}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All of your data will be permanently removed from our
            database. This action is irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={async () => await handleDelete()}
          >
            Delete
            <Show when={!isDeleting}>
              <Icons.Trash className="h-4 w-4" />
            </Show>
            <Show when={isDeleting}>
              <Icons.Loader className="h-4 w-4" />
            </Show>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

UserDeleteDialog.displayName = "UserDeleteDialog";

export { UserDeleteDialog };
