import "server-only";

import { planetscaleEdge, Row } from "@/lib/planetscale-edge";
import { JobOffer } from "@/types";
import { cache } from "react";

const createJobOffer = (row: Row): JobOffer => {
  // check if row is an array
  const jobOffer = (Array.isArray(row) ? row[0] : row) as JobOffer;

  return {
    ...jobOffer,
    // convert string decimal to number
    commission: Number(jobOffer?.commission ?? 0),
    guaranteeSalary: Number(jobOffer?.guaranteeSalary ?? 0),
    accepted: Boolean(jobOffer?.accepted ?? false),
    rejected: Boolean(jobOffer?.rejected ?? false),
    sent: Boolean(jobOffer?.sent ?? false)
  };
};

const getJobOffer = cache(async (id: string): Promise<JobOffer | undefined> => {
  const { rows } = await planetscaleEdge.execute("SELECT * FROM job_offer WHERE id = ?", [+id]);

  const row = rows?.[0];

  if (!row) {
    return undefined;
  }

  return createJobOffer(row);
});

const getJobOffers = cache(async () => {
  const { rows } = await planetscaleEdge.execute("SELECT * FROM job_offer ORDER BY id DESC");

  return (rows ?? []).map(row => createJobOffer(row));
});

export { getJobOffer, getJobOffers };
