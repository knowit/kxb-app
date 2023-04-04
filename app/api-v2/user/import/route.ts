import prisma from "@/lib/prisma";
import { User } from "@/types";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey');

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return new Response('Unauthorized', {
      status: 401
    });
  }

  try {
    const timeStart = Date.now();
    const users = await fetch(`https://kxb.app/api/user?apiKey=${process.env.API_KEY}&includeWorkDayDetails=true&includeFeedback=true`);

    const usersJson = await users.json() as User[];

    await prisma.$executeRaw`TRUNCATE TABLE user;`
    await prisma.$executeRaw`TRUNCATE TABLE user_work_day_detail;`
    await prisma.$executeRaw`TRUNCATE TABLE user_feedback;`

    // sleep 1 second to ensure that truncate statements are executed
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // async loop all users and insert into db
    for (const user of usersJson.sort((a, b) => a.id - b.id)) {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                activeDirectoryId: user.activeDirectoryId,
                accessTokenExpires: user.accessTokenExpires,
                commission: user.commission,
                created: user.created,
                hourlyRate: user.hourlyRate,
                isAdmin: user.isAdmin,
                isSpecialist: user.isSpecialist,
                refreshToken: user.refreshToken,
                updated: user.updated,
                tax: user.tax,
                workHours: user.workHours,
                workDayDetails: {
                    createMany: {
                        data: user.workDayDetails.map((w) => ({
                            date: w.date,
                            extraHours: w.extraHours,
                            nonCommissionedHours: w.nonCommissionedHours,
                            sickDay: w.sickDay,
                        }))}},
                feedback: {
                    createMany: {
                        data: user.feedback.map((f) => ({
                            id: f.id,
                            feedback: f.feedback,
                            reaction: f.reaction,
                            date: f.date,
                    })),
                },

                }
            }});
        }

    const timeEnd = Date.now();

    return NextResponse.json({
      message: 'Imported users',
      users: usersJson.length,
      time: `${timeEnd - timeStart}ms`
    });
  } catch (error) {
    return new Response(error, {
      status: 422
    });
  }
}
