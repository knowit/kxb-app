import prismaUser from "@/lib/prismaUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const { created, updated, refreshToken, ...user } = await prismaUser.getByEmail(
    "kxb.specialist.test.user@knowitgroup.com"
  );

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
