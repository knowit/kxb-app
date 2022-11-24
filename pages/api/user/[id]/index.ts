import prismaUser from "@/lib/prismaUser";
import { UserWorkDayDetail } from "@/types";
import { getSessionUserActiveDirectoryId, sessionUserIsAdmin } from "@/utils/sessionUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const { id } = req.query;

  if (id === null || id === undefined) {
    return res.status(400).end();
  }

  const sessionUserActiveDirectoryId = getSessionUserActiveDirectoryId(session);

  const { refreshToken, ...user } = await prismaUser.getById(+id);

  if (
    !sessionUserIsAdmin(session) &&
    user.activeDirectoryId !== sessionUserActiveDirectoryId?.toLowerCase()
  ) {
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
    const { commission, hourlyRate, tax, workHours, workDayDetails } = req.body;

    const { workDaysToCreate, workDaysToDelete, workDaysToUpdate } = (
      (workDayDetails ?? []) as UserWorkDayDetail[]
    )?.reduce(
      (acc, curr) => {
        const existing = user.workDayDetails.find(a => a.date === curr.date);

        if (existing && curr.extraHours === 0 && curr.nonCommissionedHours === 0) {
          return {
            ...acc,
            workDaysToDelete: [...acc.workDaysToDelete, curr]
          };
        }

        if (
          existing &&
          (curr.extraHours !== 0 || curr.nonCommissionedHours !== 0) &&
          (existing.extraHours !== curr.extraHours ||
            existing.nonCommissionedHours !== curr.nonCommissionedHours ||
            existing.sickDay !== curr.sickDay)
        ) {
          return {
            ...acc,
            workDaysToUpdate: [...acc.workDaysToUpdate, curr]
          };
        }

        if (!existing && (curr.extraHours !== 0 || curr.nonCommissionedHours !== 0)) {
          return {
            ...acc,
            workDaysToCreate: [...acc.workDaysToCreate, curr]
          };
        }

        return acc;
      },
      {
        workDaysToCreate: [] as UserWorkDayDetail[],
        workDaysToDelete: [] as UserWorkDayDetail[],
        workDaysToUpdate: [] as UserWorkDayDetail[]
      }
    );

    await prismaUser.update({
      data: {
        commission,
        hourlyRate,
        tax,
        workHours,
        workDayDetails: {
          // Create new records
          createMany: {
            data: workDaysToCreate.map(workDayDetail => ({
              date: workDayDetail.date,
              extraHours: workDayDetail.extraHours,
              nonCommissionedHours: workDayDetail.nonCommissionedHours,
              sickDay: workDayDetail.sickDay
            }))
          },
          // Update records that already exists
          updateMany: workDaysToUpdate.map(workDayDetail => ({
            data: {
              extraHours: workDayDetail.extraHours,
              nonCommissionedHours: workDayDetail.nonCommissionedHours,
              sickDay: workDayDetail.sickDay
            },
            where: {
              date: workDayDetail.date,
              userId: user.id
            }
          })),
          deleteMany: {
            id: {
              in: workDaysToDelete.map(workDayDetail => workDayDetail.id)
            }
          }
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
        },
        updated: new Date()
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
