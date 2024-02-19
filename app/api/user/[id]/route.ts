import { db } from "@/lib/db";
import { userProfileSchema } from "@/lib/validations/user";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export const runtime: ServerRuntime = "edge";

type Params = {
  id: string;
};

const userParamsSchema = z.object({
  id: z.coerce.number()
});

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  try {
    const { id } = await userParamsSchema.parseAsync(params);
    if (+id !== token.id) {
      return new Response("Bad request", {
        status: 400
      });
    }

    const res = await request.json();

    const { name } = await userProfileSchema.parseAsync(res);

    await db.updateTable("user").set({ name }).where("id", "=", id).execute();

    return new Response("Patched", {
      status: 200
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error },
        {
          status: 422
        }
      );
    }

    return new Response(error, {
      status: 422
    });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  try {
    const { id } = await userParamsSchema.parseAsync(params);
    if (+id !== token.id) {
      return new Response("Bad request", {
        status: 400
      });
    }

    await db.transaction().execute(async trx => {
      // delete settings
      await trx.deleteFrom("user_settings").where("userId", "=", id).execute();
      // delete work day details
      await trx.deleteFrom("user_work_day_detail").where("userId", "=", id).execute();
      // delete user
      await trx.deleteFrom("user").where("id", "=", id).execute();
    });

    return new Response("Deleted", {
      status: 200
    });
  } catch (error) {
    console.error(JSON.stringify(error));

    return new Response(error, {
      status: 422
    });
  }
}
