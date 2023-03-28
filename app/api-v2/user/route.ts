import { planetscaleEdge } from "@/lib/planetscale-edge";
import { createUser } from "@/lib/user";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "experimental-edge";

export async function GET(request: NextRequest) {
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
