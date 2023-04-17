import { db } from "@/lib/db";
import { userWorkDayDetailSchema } from "@/lib/validations/user";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export const runtime: ServerRuntime = "experimental-edge";

export async function PATCH(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  try {
    const res = await request.json();

    const { id, date, extraHours, nonCommissionedHours, sickDay } =
      userWorkDayDetailSchema.parse(res);

    const userWorkDayDetail = await db
      .selectFrom("user_work_day_detail")
      .selectAll()
      .where("userId", "=", +token.id)
      .where("date", "=", date)
      .executeTakeFirst();

    // update
    if (userWorkDayDetail) {
      if (extraHours === 0 && nonCommissionedHours === 0) {
        await db
          .deleteFrom("user_work_day_detail")
          .where("id", "=", userWorkDayDetail.id)
          .executeTakeFirst();

        return new Response("Patched", {
          status: 200
        });
      }

      await db
        .updateTable("user_work_day_detail")
        .set({ nonCommissionedHours, extraHours, sickDay })
        .where("id", "=", userWorkDayDetail.id)
        .executeTakeFirst();

      return new Response("Patched", {
        status: 200
      });

      // create if extra hours or non commissioned hours are greater than 0
    } else if (extraHours > 0 || nonCommissionedHours > 0) {
      await db
        .insertInto("user_work_day_detail")
        .values({
          userId: +token.id,
          date,
          nonCommissionedHours,
          extraHours,
          sickDay
        })
        .executeTakeFirst();
    }

    return new Response("Patched", {
      status: 200
    });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ status: 422, body: error.issues });
    }

    return new Response(error, {
      status: 422
    });
  }
}
