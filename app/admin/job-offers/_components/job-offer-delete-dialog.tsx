"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { type JobOffer } from "@/types";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

function JobOfferDeleteDialog({
  jobOffer,
  disabled = false
}: {
  jobOffer: JobOffer;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const isLoading = useMemo(() => isPending || isDeleting, [isPending, isDeleting]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={disabled}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you sure you want to delete this job offer?</AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={async () => {
              setIsDeleting(true);

              await fetch(`/api-v2/job-offer/${jobOffer.id}`, {
                method: "DELETE"
              });

              startTransition(() => {
                router.refresh();
                router.push("/admin/job-offers");
              });
            }}
            disabled={isLoading}
          >
            Delete job offer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { JobOfferDeleteDialog };
