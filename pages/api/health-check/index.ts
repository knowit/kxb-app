import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findUnique(
    {
      where: {
        email: "kxb.specialist.test.user@knowitgroup.com"
      },
      include: {
        workDayDetails: true
      }
    }
  );

  if (!user) {
    return res.status(404).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({
      ...user,
      workDayDetails: (user.workDayDetails ?? []).map(workDayDetail => ({
        ...workDayDetail,
        extraHours: +workDayDetail.extraHours,
        nonCommissionedHours: +workDayDetail.nonCommissionedHours
      }))
    });
  }

  return res.send("Method not allowed.");
}
