import { planetscaleEdge } from "@/lib/planetscale-edge";
import { getEdgeFriendlyToken } from "@/lib/token";
import { createJobOfferSchema } from "@/lib/validations/job-offer";
import { nanoid } from "nanoid/non-secure";
import { NextResponse } from "next/server";

export const runtime = "experimental-edge";

export async function POST(request: Request) {
  const token = await getEdgeFriendlyToken();

  if (!token) {
    return new Response("Bad request", {
      status: 400
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
