import { db } from "@/lib/db/db";
import { userSettingsSchema } from "@/lib/validations/user";
import { eq } from "drizzle-orm";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";
import { userSettingsTable } from "../../../../../lib/db/schema";

export const runtime: ServerRuntime = "edge";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  try {
    const id = params?.id;

    if (!id) {
      return new Response("Bad request", {
        status: 400
      });
    }

    if (+id !== token.id) {
      return new Response("Bad request", {
        status: 400
      });
    }

    const body = await request.json();

    const { closeUserSalaryDialogOnSaveSuccess, closeUserWorkDayDetailsDialogOnSaveSuccess } =
      await userSettingsSchema.parseAsync(body);

    await db
      .update(userSettingsTable)
      .set({
        closeUserSalaryDialogOnSaveSuccess,
        closeUserWorkDayDetailsDialogOnSaveSuccess
      })
      .where(eq(userSettingsTable.userId, +id));

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
