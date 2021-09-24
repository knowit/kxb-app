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
    return res.status(200).json([
      {
        firstName: "Tommy",
        lastName: "Barvåg",
        email: "tommy@barvaag.com",
        phone: "97777907",
        hourlyRate: "1200",
        commission: 0.4
      },
      {
        firstName: "Tommy",
        lastName: "Barvåg",
        email: "tommy@barvaag.com",
        phone: "97777907",
        hourlyRate: "1200",
        commission: 0.4
      }
    ]);
  }

  if (req.method === "POST") {
    const {
      body: { firstName, lastName, email, phone, hourlyRate, commission }
    } = req;

    if (firstName && lastName && email && phone && hourlyRate && commission) {
      // Insert

      return res.status(202).end();
    }

    return res.status(400).end();
  }

  return res.send("Method not allowed.");
}
