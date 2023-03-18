import prisma from "@/lib/prisma";
import { userWorkDayDetailSchema } from "@/lib/validations/user";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const user = await prisma.user.findUnique({
    where: {
      activeDirectoryId: session.user.activeDirectoryId
    }
  });

  if (!user) {
    return res.status(404).end();
  }

  if (!session.user.isAdmin && user.activeDirectoryId !== session.user.activeDirectoryId) {
    return res.status(403).end();
  }

  if (user === null || user === undefined) {
    return res.status(404).end();
  }

  if (req.method === "PATCH" && req.body) {
    const body = req.body ? req.body : {};

    const { id, date, extraHours, nonCommissionedHours, sickDay } =
      userWorkDayDetailSchema.parse(body);

    await prisma.user_work_day_detail.upsert({
      where: {
        id: id
      },
      create: {
        userId: user.id,
        sickDay: sickDay,
        extraHours: extraHours,
        nonCommissionedHours: nonCommissionedHours,
        date: date
      },
      update: {
        nonCommissionedHours: nonCommissionedHours,
        extraHours: extraHours,
        sickDay: sickDay
      }
    });

    return res.status(200).end();
  }

  return res.send("Method not allowed.");
}
