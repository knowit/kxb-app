import { AdminShell } from "@/app/admin/_components/admin-shell";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { db } from "@/lib/db";
import { AdminContent } from "../_components/admin-content";
import { AdminHeader } from "../_components/admin-header";

export const runtime = "experimental-edge";

export default async function JobOffersPage() {
  const jobOffers = await db.selectFrom("job_offer").selectAll().orderBy("id", "desc").execute();

  return (
    <AdminShell>
      <AdminHeader heading="Job offers" text="View and administer job offers">
        <Link className={buttonVariants({ variant: "action" })} href="/admin/job-offers/create">
          Create
        </Link>
      </AdminHeader>
      <AdminContent>
        <ul>
          {jobOffers.map(jobOffer => (
            <li key={jobOffer.id}>
              <a href={`/admin/job-offers/${jobOffer.id}`}>
                {jobOffer.name} - {jobOffer.email}
              </a>
            </li>
          ))}
        </ul>
      </AdminContent>
    </AdminShell>
  );
}
