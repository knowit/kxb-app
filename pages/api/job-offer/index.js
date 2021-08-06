import planetscaleTableJobOffer from "@/lib/planetscale/repositories/jobOffer";
import { sessionUserIsAdmin } from "@/utils/sessionUtils";
import { getSession } from "next-auth/client";

export default async function JobOffers(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  if (!sessionUserIsAdmin(session)) {
    return res.status(403).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(await planetscaleTableJobOffer.get());
  }

  if (req.method === "POST") {
    const {
      body: { firstName, lastName, email, phone, hourlyRate, commission }
    } = req;

    if (firstName && lastName && email && phone && hourlyRate && commission) {
      const result = await planetscaleTableJobOffer.insert(
        firstName,
        lastName,
        email,
        phone,
        +hourlyRate,
        +commission
      );

      return res.status(202).end();
    }

    return res.status(400).end();
  }

  return res.send("Method not allowed.");
}
