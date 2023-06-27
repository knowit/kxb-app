import { getUserAvatar } from "@/lib/user";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const runtime: ServerRuntime = "edge";

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
    const avatar = await getUserAvatar(token.id, true);

    return NextResponse.json(avatar);
  } catch (error) {
    return new Response(error, {
      status: 422
    });
  }
}
