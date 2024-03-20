import { db, takeFirst } from "@/lib/db/db";
import { userWorkDayDetailSchema } from "@/lib/validations/user";
import { and, eq } from "drizzle-orm";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { userWorkDayDetailTable } from "../../../../lib/db/schema";

export const runtime: ServerRuntime = "edge";

type Params = {
  id: string;
};
const userParamsSchema = z.object({
  id: z.coerce.number()
});

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  const { id } = await userParamsSchema.parseAsync(params);

  if (+id !== token.id) {
    return new Response("Bad request", {
      status: 400
    });
  }

  try {
    const res = await request.json();

    const { id, date, extraHours, nonCommissionedHours, sickDay } =
      userWorkDayDetailSchema.parse(res);

    const userWorkDayDetail = await db
      .select()
      .from(userWorkDayDetailTable)
      .where(
        and(eq(userWorkDayDetailTable.userId, +token.id), eq(userWorkDayDetailTable.date, date))
      )
      .then(takeFirst);

    // update
    if (userWorkDayDetail) {
      if (extraHours === 0 && nonCommissionedHours === 0) {
        await db
          .delete(userWorkDayDetailTable)
          .where(eq(userWorkDayDetailTable.id, userWorkDayDetail.id));

        return new Response("Patched", {
          status: 200
        });
      }

      await db
        .update(userWorkDayDetailTable)
        .set({ nonCommissionedHours, extraHours, sickDay })
        .where(eq(userWorkDayDetailTable.id, userWorkDayDetail.id));

      return new Response("Patched", {
        status: 200
      });

      // create if extra hours or non commissioned hours are greater than 0
    } else if (extraHours > 0 || nonCommissionedHours > 0) {
      await db.insert(userWorkDayDetailTable).values({
        userId: +token.id,
        date,
        nonCommissionedHours,
        extraHours,
        sickDay
      });
    }

    return new Response("Patched", {
      status: 200
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    if (error instanceof z.ZodError) {
      return NextResponse.json({ status: 422, body: error.issues });
    }

    return new Response(error, {
      status: 422
    });
  }
}
