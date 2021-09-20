import prisma from "@/lib/prisma";
import redisUser from "@/lib/redisUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Import(req: NextApiRequest, res: NextApiResponse) {
  const entries = await redisUser.get();

  await prisma.user.deleteMany({})

  const result = await prisma.user.createMany({
    data: entries.map(entry => ({
      activeDirectoryId: entry.id,
      email: entry.email,
      refreshToken: entry.refreshToken,
      commission: entry.commission,
      created: new Date(entry.createdAt).toISOString(),
      hourlyRate: entry.hourlyRate,
      isAdmin: entry.isAdmin ?? false,
      isSpecialist: entry.isSpecialist ?? false,
      name: entry.name,
      tax: entry.tax,
      updated: new Date(entry.updatedAt).toISOString(),
    }))
  })

  return res.status(200).json(result);
}
