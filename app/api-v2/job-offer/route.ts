import { planetscaleEdge } from "@/lib/planetscale-edge";
import { createJobOfferSchema } from "@/lib/validations/job-offer";
import { nanoid } from "nanoid/non-secure";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "experimental-edge";

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

    const { insertId } = await planetscaleEdge.execute(
      "INSERT INTO job_offer (name, email, commission, guaranteeSalary, shareId, sentBy) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, commission, guaranteeSalary, shareId, token.email]
    );

    return NextResponse.json({
      insertId
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return new Response(error, {
      status: 422
    });
  }
}
