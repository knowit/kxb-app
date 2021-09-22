import prisma from "@/lib/prisma";
import prismaUser from "@/lib/prismaUser";
import { getSessionUserId, sessionUserIsAdmin } from "@/utils/sessionUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const { id } = req.query;

  if (id === null || id === undefined) {
    return res.status(400).end();
  }

  const sessionUserId = getSessionUserId(session);

  const { created, updated, refreshToken, ...user } = await prismaUser.getById(+id);

  if (!sessionUserIsAdmin(session) && user.activeDirectoryId !== sessionUserId?.toLowerCase()) {
    return res.status(403).end();
  }

  if (user === null || user === undefined) {
    return res.status(404).end();
  }

  // TODO: Create convert to DTO
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

  // TODO: Rework update section
  if (req.method === "PUT" && req.body) {
    const { commission, hourlyRate, tax, workDayDetails } = req.body;

    const workDaysToUpdate = (workDayDetails ?? []).filter(a =>
      user.workDayDetails.some(b => a.date === b.date)
    );
    const workDaysToCreate = (workDayDetails ?? []).filter(
      a => !workDaysToUpdate.some(b => a.date === b.date)
    );

    await prisma.user.update({
      data: {
        commission,
        hourlyRate,
        tax,
        workDayDetails: {
          // Create new records
          createMany: {
            data: workDaysToCreate.map(workDayDetail => ({
              date: workDayDetail.date,
              extraHours: workDayDetail.extraHours,
              nonCommissionedHours: workDayDetail.nonCommissionedHours
            }))
          },
          // Update records that already exists
          updateMany: workDaysToUpdate.map(workDayDetail => ({
            data: {
              extraHours: workDayDetail.extraHours,
              nonCommissionedHours: workDayDetail.nonCommissionedHours
            },
            where: {
              date: workDayDetail.date,
              userId: user.id
            }
          }))
          // Delete records where both non commissioned hours and
          // extra hours is less than or equals 0
          // deleteMany: {
          //   nonCommissionedHours: {
          //     lte: 0
          //   },
          //   extraHours: {
          //     lte: 0
          //   }
          // }
        }
      },
      where: {
        id: +id
      }
    });

    return res.status(200).end();
  }

  if (req.method === "DELETE") {
    await prismaUser.deleteById(+id);

    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
}
