import prisma from "@/lib/prisma";
import { sessionUserIsAdmin } from "@/utils/sessionUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function getAllUsers(options = {
  includeWorkDayDetails: false,
  includeFeedback: false
}) {
  return (await prisma.user.findMany({
    include: {
      workDayDetails: options.includeWorkDayDetails,
      feedback: options.includeFeedback
    }
  })).map(user => ({
    ...user,
    accessTokenExpires: Number(user?.accessTokenExpires ?? 0),
    commission: Number(user?.commission ?? 0),
    tax: Number(user?.tax ?? 0),
    workHours: Number(user?.workHours ?? 0),
    hourlyRate: Number(user?.hourlyRate ?? 0),
    workDayDetails: (user?.workDayDetails ?? []).map(workDayDetail => ({
      ...workDayDetail,
      extraHours: Number(workDayDetail?.extraHours ?? 0),
      nonCommissionedHours: Number(workDayDetail?.nonCommissionedHours ?? 0)
    }))
  }))
}

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  // check search params for API key
  if (req.query.apiKey && req.query.apiKey === process.env.API_KEY) {
    return res.status(200).json((await getAllUsers({
      includeWorkDayDetails: req.query.includeWorkDayDetails === "true",
      includeFeedback: req.query.includeFeedback === "true"
    })));
  }

  if (!session) {
    return res.status(401).end();
  }

  if (!sessionUserIsAdmin(session)) {
    return res.status(403).end();
  }

  if (req.method === "GET") {
    return res.status(200).json((await getAllUsers({
      includeWorkDayDetails: req.query.includeWorkDayDetails === "true",
      includeFeedback: req.query.includeFeedback === "true"
    })));

  }

  return res.send("Method not allowed.");
}
