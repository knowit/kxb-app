import { db } from "@/lib/db/db";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { usersTable } from "../../../lib/db/schema";

export const runtime: ServerRuntime = "edge";

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
    const users = await db.select().from(usersTable).all();

    return NextResponse.json(
      users.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
    );
  } catch (error) {
    return new Response(error, {
      status: 422
    });
  }
}
