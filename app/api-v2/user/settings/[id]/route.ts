import { db } from "@/lib/db";
import { userSettingsSchema } from "@/lib/validations/user";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export const runtime: ServerRuntime = "experimental-edge";

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

    const body = await request.json();

    const { closeUserSalaryDialogOnSaveSuccess, closeUserWorkDayDetailsDialogOnSaveSuccess } =
      await userSettingsSchema.parseAsync(body);

    await db
      .updateTable("user_settings")
      .set({
        closeUserSalaryDialogOnSaveSuccess,
        closeUserWorkDayDetailsDialogOnSaveSuccess
      })
      .where("userId", "=", +id)
      .executeTakeFirst();

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
