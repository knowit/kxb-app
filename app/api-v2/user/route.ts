import { planetscaleEdge } from "@/lib/planetscale-edge";
import { getEdgeFriendlyToken } from "@/lib/token";
import { createUser } from "@/lib/user";
import { NextResponse } from "next/server";

export const runtime = "experimental-edge";

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

    const users = rows
      .map(row => createUser(row))
      .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());

    return NextResponse.json(users);
  } catch (error) {
    return new Response(error, {
      status: 422
    });
  }
}
