import { planetscaleEdge } from "@/lib/planetscale-edge";
import { userWorkDayDetailSchema } from "@/lib/validations/user";
import { UserWorkDayDetail } from "@/types";
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

    const { rows } = await planetscaleEdge.execute(
      "SELECT * FROM user_work_day_detail WHERE userId = ? AND date = ?",
      [token.id, date]
    );

    // update
    if (rows?.length > 0) {
      let existing = rows[0] as UserWorkDayDetail;

      if (extraHours === 0 && nonCommissionedHours === 0) {
        await planetscaleEdge.execute("DELETE FROM user_work_day_detail WHERE id = ?", [
          +existing.id
        ]);

        return new Response("Patched", {
          status: 200
        });
      }

      await planetscaleEdge.execute(
        "UPDATE user_work_day_detail SET nonCommissionedHours = ?, extraHours = ?, sickDay = ? WHERE id = ?",
        [nonCommissionedHours, extraHours, sickDay, +existing.id]
      );
      // create if extra hours or non commissioned hours are greater than 0
    } else if (extraHours > 0 || nonCommissionedHours > 0) {
      await planetscaleEdge.execute(
        "INSERT INTO user_work_day_detail (userId, date, nonCommissionedHours, extraHours, sickDay) VALUES (?, ?, ?, ?, ?)",
        [+token.id, date, nonCommissionedHours, extraHours, sickDay]
      );
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
