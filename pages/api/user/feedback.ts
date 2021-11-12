import prisma from "@/lib/prisma";
import { getSessionUserActiveDirectoryId } from "@/utils/sessionUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async function Feedback(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const sessionUserActiveDirectoryId = getSessionUserActiveDirectoryId(session);

  if (sessionUserActiveDirectoryId === null || sessionUserActiveDirectoryId === undefined) {
    return res.status(400).end();
  }

  if (req.method === "GET") {
    const feedback = await prisma.userFeedback.findMany({
      include: {
        user: true
      }
    });

    return res.status(200).json(
      (feedback ?? []).reduce(
        (acc, curr) => [
          ...acc,
          {
            ...curr,
            user: {
              name: curr.user.name,
              email: curr.user.email
            }
          }
        ],
        []
      )
    );
  }

  const { id: userId } = await prisma.user.findUnique({
    where: { activeDirectoryId: sessionUserActiveDirectoryId }
  });

  if (req.method === "POST") {
    const message: string = req.body.message;

    if (message === null || message === undefined) {
      return res.status(400).end();
    }

    await prisma.userFeedback.create({
      data: {
        feedback: message,
        reaction: 1,
        userId
      }
    });

    return res.status(204).end();
  }

  return res.send("Method not allowed.");
}
