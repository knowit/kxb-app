import { type NextRequest } from "next/server";

import { getUser } from "@/lib/user";
import { userFeedbackSchema } from "@/lib/validations/user";
import { getFeedbackEmailTemplate } from "@/utils/email-utils";
import sendGridMail from "@sendgrid/mail";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import * as z from "zod";

export const runtime = "nodejs";

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

    const sendGridApiKey = process.env.SEND_GRID_API_KEY;

    if (sendGridApiKey) {
      sendGridMail.setApiKey(sendGridApiKey);

      const user = await getUser(token.id);

      const name = user.name ?? user.email;

      await sendGridMail.send({
        to: process.env.FEEDBACK_RECIPIENT_EMAIL,
        from: "tommy.barvag@knowit.no",
        subject: `kxb.app feedback from ${name}`,
        html: getFeedbackEmailTemplate(name, feedback, user.email)
      });
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
