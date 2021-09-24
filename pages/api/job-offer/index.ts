import prisma from "@/lib/prisma";
import { sessionUserIsAdmin } from "@/utils/sessionUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async function JobOffers(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  if (!sessionUserIsAdmin(session)) {
    return res.status(403).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(await prisma.jobOffer.findMany({}));
  }

  if (req.method === "POST") {
    const {
      body: { firstName, lastName, email, phone, hourlyRate, commission }
    } = req;

    if (firstName && lastName && email && phone && hourlyRate && commission) {
      await prisma.jobOffer.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          hourlyRate: +hourlyRate,
          commission: +commission
        }
      });

      return res.status(202).end();
    }

    return res.status(400).end();
  }

  return res.send("Method not allowed.");
}
