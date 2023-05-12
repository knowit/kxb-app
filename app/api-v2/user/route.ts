import { db } from "@/lib/db";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const runtime: ServerRuntime = "experimental-edge";

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
    const users = await db
      .selectFrom("user")
      .select([
        "id",
        "name",
        "email",
        "activeDirectoryId",
        "tax",
        "taxTable",
        "hourlyRate",
        "commission",
        "workHours",
        "isAdmin",
        "isSpecialist",
        "created",
        "updated"
      ])
      .execute();

    return NextResponse.json(
      users.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
    );
  } catch (error) {
    return new Response(error, {
      status: 422
    });
  }
}
