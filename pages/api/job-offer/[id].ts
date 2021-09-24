import { sessionUserIsAdmin } from "@/utils/sessionUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async function JobOffer(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const { id } = req.query;

  if (id === null || id === undefined) {
    return res.status(400).end();
  }

  if (!sessionUserIsAdmin(session)) {
    return res.status(403).end();
  }

  const jobOffer = {
    firstName: "Tommy",
    lastName: "Barvåg",
    email: "tommy@barvaag.com",
    phone: "97777907",
    hourlyRate: "1200",
    commission: 0.4
  };

  if (jobOffer === null || jobOffer === undefined) {
    return res.status(404).end();
  }

  // TODO: Create convert to DTO
  if (req.method === "GET") {
    return res.status(200).json(jobOffer);
  }

  if (req.method === "PUT" && req.body) {
    const {
      body: { firstName, lastName, email, phone, hourlyRate, commission }
    } = req;

    // Update offer

    return res.status(200).end();
  }

  if (req.method === "DELETE") {
    // Delete

    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
}
