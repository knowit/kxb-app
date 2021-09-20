import prisma from "@/lib/prisma";
import { omit } from "@/utils/commonUtils";
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

  const {created, updated, refreshToken, ...user} = await prisma.user.findUnique({
    where: {
      id: +id
    },
    include: {
      workDayDetails: true
    }
  });

  if (!sessionUserIsAdmin(session) && user.activeDirectoryId !== sessionUserId?.toLowerCase()) {
    return res.status(403).end();
  }

  

  if (user === null || user === undefined) {
    return res.status(404).end();
  }

  // TODO: Create convert to DTO
  if (req.method === "GET") {
    return res.status(200).json(user);
  }

  if (req.method === "PUT" && req.body) {
    await prisma.user.update({
      data: omit(req.body, ["id", "workDayDetails"]),
      where: {
        id: +id
      }
    });
    return res.status(200).end();
  }

  if (req.method === "DELETE") {
    await prisma.user.delete({
      where: {
        id: +id
      }
    });
    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
}
