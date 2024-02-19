import { getUser } from "@/lib/user";
import { userFeedbackSchema } from "@/lib/validations/user";
import { getFeedbackEmailTemplate } from "@/utils/email-utils";
import { ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import sanitizeHtml from "sanitize-html";
import * as z from "zod";

export const runtime: ServerRuntime = "edge";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  try {
    const res = await request.json();

    const { feedback } = await userFeedbackSchema.parseAsync(res);

    const user = await getUser(token.id);

    const name = user.name ?? user.email;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_SENDING_API_KEY}`
      },
      body: JSON.stringify({
        to: process.env.FEEDBACK_RECIPIENT_EMAIL,
        from: "post@kxb.app",
        subject: `kxb.app feedback from ${name}`,
        html: getFeedbackEmailTemplate(name, sanitizeHtml(feedback), user.email)
      })
    });

    if (resendResponse.ok) {
      const data = await res.json();
      console.log(data);
    }

    return new Response("Created", {
      status: 201
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
