import { type NextRequest } from "next/server";

import { planetscaleEdge } from "@/lib/planetscale-edge";
import { userFeedbackSchema } from "@/lib/validations/user";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import * as z from "zod";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Bad request", {
      status: 400
    });
  }

  try {
    const res = await request.json();

    const { feedback, reaction, userId } = await userFeedbackSchema.parseAsync(res);

    await planetscaleEdge.execute(
      "INSERT INTO user_feedback (feedback, reaction, userId) VALUES (?, ?, ?)",
      [feedback, reaction, +userId]
    );

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
