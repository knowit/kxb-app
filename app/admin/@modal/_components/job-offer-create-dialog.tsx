"use client";

import { CreateJobOfferForm } from "@/components/job-offer/create-job-offer-salary-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function JobOfferCreateDialog() {
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
        <DialogHeader>Create job offer</DialogHeader>
        <DialogDescription>
          The job offer is created as a draft and can be edited later. The job offer will only be
          sent to the candidate when you click the &quot;Send job offer&quot; button on the job
          offer page.
        </DialogDescription>
        <CreateJobOfferForm />
      </DialogContent>
    </Dialog>
  );
}

export { JobOfferCreateDialog };
