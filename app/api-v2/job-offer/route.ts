import { db } from "@/lib/db";
import { getUser } from "@/lib/user";
import { createJobOfferSchema } from "@/lib/validations/job-offer";
import { nanoid } from "nanoid/non-secure";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const runtime: ServerRuntime = "experimental-edge";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  if (!token.isAdmin) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  try {
    const body = await request.json();

    const { commission, email, guaranteeSalary, name } = await createJobOfferSchema.parseAsync(
      body
    );

    const shareId = nanoid();

    const { insertId } = await db
      .insertInto("job_offer")
      .values({
        name,
        email,
        commission,
        guaranteeSalary,
        shareId,
        sentBy: token.email ?? (await getUser(token.id)).email
      })
      .executeTakeFirst();

    return NextResponse.json({
      insertId: Number(insertId)
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return new Response(error, {
      status: 422
    });
  }
}
