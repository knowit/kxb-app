import { db } from "@/lib/db";
import { userFeedbackSchema } from "@/lib/validations/user";
import DOMPurify from "isomorphic-dompurify";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

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

    await db
      .insertInto("user_feedback")
      .values({
        feedback: DOMPurify.sanitize(feedback),
        reaction,
        userId: +userId
      })
      .executeTakeFirst();

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
