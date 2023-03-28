import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { getJobOffers } from "@/lib/job-offer";

export default async function JobOffersPage() {
  const jobOffers = await getJobOffers();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1>View job offers</h1>
        <Link className={buttonVariants({ variant: "action" })} href="/dashboard/job-offer/create">
          Create
        </Link>
      </div>
      <ul>
        {jobOffers.map(jobOffer => (
          <li key={jobOffer.id}>
            <a href={`/dashboard/job-offer/${jobOffer.id}`}>
              {jobOffer.name} - {jobOffer.email}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
