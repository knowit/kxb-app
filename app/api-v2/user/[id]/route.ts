import { type NextRequest } from "next/server";

import { planetscaleEdge } from "@/lib/planetscale-edge";
import { userSalaryDetailSchema } from "@/lib/validations/user";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import * as z from "zod";

// TODO: fix this once await request.json() is supported
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Bad request", {
      status: 400
    });
  }

  try {
    const res = await request.json();

    const { commission, hourlyRate, tax, workHours } = await userSalaryDetailSchema.parseAsync(res);

    await planetscaleEdge.execute(
      "UPDATE user SET commission = ?, hourlyRate = ?, tax = ?, workHours = ? WHERE id = ?",
      [commission, hourlyRate, tax, workHours, +token.id]
    );

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
