import { db } from "@/lib/db";
import { getMySQLDate } from "@/utils/date-utils";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { type NextRequest } from "next/server";
import * as z from "zod";

export const runtime: ServerRuntime = "experimental-edge";

type Params = {
  id: string;
};

const jobOfferParamsSchema = z.object({
  id: z.coerce.number()
});

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
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
    const { id } = await jobOfferParamsSchema.parseAsync(params);

    await db
      .updateTable("job_offer")
      .where("id", "=", id)
      .set({
        sent: true,
        updated: getMySQLDate(),
        sentDate: getMySQLDate()
      })
      .executeTakeFirst();

    return new Response("PATCHED", {
      status: 200
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return new Response(error, {
      status: 422
    });
  }
}
