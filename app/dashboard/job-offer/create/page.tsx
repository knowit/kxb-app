import { CreateJobOfferForm } from "@/components/job-offer/create-job-offer-salary-form";
import { Prose } from "@/components/prose";

interface SelectedYearPageProps {
  params: { commission: string };
}

export const runtime = "experimental-edge";

export default async function CreateJobOfferPage({ params }: SelectedYearPageProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Prose className="w-full grow">
          <h1>Create job offer</h1>
          <p>Create a job offer for a candidate.</p>
          <p>
            The job offer is created as a draft and can be edited later. The job offer will only be
            sent to the candidate when you click the &quot;Send job offer&quot; button on the job
            offer page.
          </p>
          <p>
            If you want to view the job offer before sending it, you can click the &quot;Preview job
            offer&quot; button. The job offer will be sent to your email address.
          </p>
        </Prose>
        <CreateJobOfferForm commission={params.commission ? +params.commission : undefined} />
      </div>
    </>
  );
}
