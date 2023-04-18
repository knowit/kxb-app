import { AdminHeader } from "@/app/admin/_components/admin-header";
import { AdminShell } from "@/app/admin/_components/admin-shell";
import { JobOfferDeleteDialog } from "@/app/admin/job-offers/_components/job-offer-delete-dialog";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { LinkButton } from "@/components/ui/link-button";
import { db } from "@/lib/db";
import { getAbsoluteUrl } from "@/utils/common-utils";
import { formatCurrency, formatPercent } from "@/utils/currency-format";
import { getFormattedLongDate } from "@/utils/date-utils";
import { notFound } from "next/navigation";
import { JobOfferSendDialog } from "../_components/job-offer-send-dialog";

interface SelectedYearPageProps {
  params: { id: string };
}

export const runtime = "experimental-edge";

export default async function JobOfferPage({ params }: SelectedYearPageProps) {
  const jobOffer = await db
    .selectFrom("job_offer")
    .selectAll()
    .where("id", "=", +params.id)
    .executeTakeFirst();

  if (!jobOffer) {
    return notFound();
  }

  return (
    <AdminShell>
      <AdminHeader
        heading={`Job offer for ${jobOffer.name}`}
        text="Review job offer before sending."
      >
        <LinkButton href="/admin/job-offers">Back to job offers</LinkButton>
      </AdminHeader>
      <div className="overflow-hidden rounded-md border border-neutral-700">
        <div className="flex items-center justify-between bg-neutral-50 px-4 py-5 dark:bg-neutral-950 sm:px-6">
          <div>
            <h3 className="text-base font-semibold leading-6">Job Offer Information</h3>
            <p className="mt-1 max-w-2xl text-sm ">Personal details and salary details.</p>
          </div>
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <CopyButton value={`${getAbsoluteUrl()}/job-offer?shareId=${jobOffer.shareId}`} />
              </HoverCardTrigger>
              <HoverCardContent>Copy public link</HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div className="border-t border-neutral-700">
          <dl>
            <div className="bg-neutral-100 px-4 py-5 dark:bg-neutral-900 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Full name</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{jobOffer.name}</dd>
            </div>
            <div className="bg-neutral-50 px-4 py-5 dark:bg-neutral-950 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Application for</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">Senior consultant</dd>
            </div>
            <div className="bg-neutral-100 px-4 py-5 dark:bg-neutral-900 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Email address</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{jobOffer.email}</dd>
            </div>
            <div className="bg-neutral-50 px-4 py-5 dark:bg-neutral-950 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Commission</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {formatPercent(jobOffer.commission)}
              </dd>
            </div>
            <div className="bg-neutral-100 px-4 py-5 dark:bg-neutral-900 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Guarantee salary</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {formatCurrency(jobOffer.guaranteeSalary)} per month
              </dd>
            </div>
            <div className="bg-neutral-50 px-4 py-5 dark:bg-neutral-950 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Sent</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{jobOffer.sent ? "Yes" : "No"}</dd>
            </div>
            <div className="bg-neutral-100 px-4 py-5 dark:bg-neutral-900 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Sent date</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {jobOffer.sent && jobOffer.sentDate
                  ? getFormattedLongDate(new Date(jobOffer.sentDate))
                  : "-"}
              </dd>
            </div>
            <div className="bg-neutral-50 px-4 py-5 dark:bg-neutral-950 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Accepted</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {jobOffer.accepted ? "Yes" : "No"}
              </dd>
            </div>
            <div className="bg-neutral-100 px-4 py-5 dark:bg-neutral-900 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Accepted date</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {jobOffer.sent && jobOffer.acceptedDate
                  ? getFormattedLongDate(new Date(jobOffer.acceptedDate))
                  : "-"}
              </dd>
            </div>
            <div className="bg-neutral-50 px-4 py-5 dark:bg-neutral-950 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">Actions</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="mr-auto flex items-center justify-end gap-3 rounded-md border border-neutral-700 p-3"
                >
                  <li>
                    <JobOfferDeleteDialog jobOffer={jobOffer} disabled={jobOffer.sent} />
                  </li>
                  <li>
                    <Button variant="outline" disabled={jobOffer.sent}>
                      Edit
                    </Button>
                  </li>
                  <li>
                    <JobOfferSendDialog jobOffer={jobOffer} disabled={jobOffer.sent} />
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </AdminShell>
  );
}
