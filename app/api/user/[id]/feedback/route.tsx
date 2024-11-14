import { db } from "@/lib/db/db";
import { userFeedbackSchema } from "@/lib/validations/user";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import sanitizeHtml from "sanitize-html";
import * as z from "zod";
import { userFeedbackTable } from "../../../../../lib/db/schema";
import { getMySQLDate } from "../../../../../utils/date-utils";

export const runtime: ServerRuntime = "edge";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  try {
    const res = await request.json();

    const { feedback, reaction, userId } = await userFeedbackSchema.parseAsync(res);

    await db.insert(userFeedbackTable).values({
      feedback: sanitizeHtml(feedback),
      reaction,
      userId: +userId,
      date: getMySQLDate()
    });

    return new Response("Created", {
      status: 201
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
