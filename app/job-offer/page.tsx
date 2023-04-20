import { CompanyBenefits } from "@/app/dashboard/_components/company-benefits";
import { Prose } from "@/components/prose";
import { SalaryCalculator } from "@/components/salary/salary-calculator";
import { db } from "@/lib/db";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import * as z from "zod";

export const runtime = "experimental-edge";

async function getJobOffer(shareId: string) {
  return await db
    .selectFrom("job_offer")
    .selectAll()
    .where("shareId", "=", shareId)
    .executeTakeFirst();
}

const jobOfferParamsSchema = z.object({
  shareId: z.string()
});

export async function generateMetadata({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const params = await jobOfferParamsSchema.safeParseAsync(searchParams);

  if (!params.success) {
    return {
      title: "Job offer"
    };
  }

  const jobOffer = await getJobOffer(params.data.shareId);

  if (!jobOffer) {
    return {
      title: "Job offer"
    };
  }

  return {
    title: `Tank you, ${jobOffer.name}`
  };
}

export default async function JobOfferPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await jobOfferParamsSchema.safeParseAsync(searchParams);

  if (!params.success) {
    return notFound();
  }

  const jobOffer = await getJobOffer(params.data.shareId);

  if (!jobOffer) {
    return notFound();
  }

  return (
    <>
      <Prose>
        <h1>Thank you, {jobOffer.name}</h1>
        <p>
          We are delighted to present you with this offer. Please use the salary calculator below to
          calculate your salary and get familiar with our payroll system.
        </p>
        <p>
          Bear in mind that the suggested hourly rate is based upon our average hourly rate. Your
          final hourly rate may become less or may become higher. Play around with the input fields
          to estimate your salary with different rates.
        </p>
        <p>
          Below the calculator you will find a summary of our most imporant company benefits and
          lastly a summary of the job offer.
        </p>
        <p>
          If you have any questions, please contact me{" "}
          <a href={`mailto:${jobOffer.sentBy}`}>{jobOffer.sentBy}</a>
        </p>
        <h2>Salary calculator</h2>
      </Prose>
      <SalaryCalculator className="mb-16" initialCommission={jobOffer.commission} />
      <CompanyBenefits />
    </>
  );
}
