import { planetscaleEdge } from "@/lib/planetscale-edge";
import { getEdgeFriendlyToken } from "@/lib/token";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
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
    const { rows } = await planetscaleEdge.execute("SELECT * FROM user", []);

    return NextResponse.json(rows);
  } catch (error) {
    return new Response(error, {
      status: 422
    });
  }
}
