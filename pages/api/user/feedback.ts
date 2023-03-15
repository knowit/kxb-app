import prisma from "@/lib/prisma";
import { getFeedbackEmailTemplate } from "@/utils/email-utils";
import sendGridMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function Feedback(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }


  if (!session.user.activeDirectoryId) {
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

  const user = await prisma.user.findUnique({
    where: { activeDirectoryId: session.user.activeDirectoryId }
  });

  if (!user) {
    return res.status(404).end();
  }

  if (req.method === "POST") {
    const message: string = req.body.message;
    const reaction: number = +req.body.reaction;

    if (message === null || message === undefined) {
      return res.status(400).end();
    }

    await prisma.userFeedback.create({
      data: {
        feedback: message,
        reaction: reaction,
        userId: user.id
      }
    });

    const sendGridApiKey = process.env.SEND_GRID_API_KEY;

    if (sendGridApiKey) {
      sendGridMail.setApiKey(sendGridApiKey);

      await sendGridMail.send({
        to: process.env.FEEDBACK_RECIPIENT_EMAIL,
        from: "tommy.barvag@knowit.no",
        subject: `kxb.app feedback from ${user.name ?? user.email}`,
        html: getFeedbackEmailTemplate(user.name ?? user.email, message, user.email)
      });
    }

    return res.status(204).end();
  }

  return res.send("Method not allowed.");
}
