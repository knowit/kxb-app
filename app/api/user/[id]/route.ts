import { db } from "@/lib/db/db";
import { userProfileSchema } from "@/lib/validations/user";
import { eq } from "drizzle-orm";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";
import { userSettingsTable, userWorkDayDetailTable, usersTable } from "../../../../lib/db/schema";

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

    await db.update(usersTable).set({ name }).where(eq(usersTable.id, +id));

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

    await db.transaction(async trx => {
      // delete settings
      await trx.delete(userSettingsTable).where(eq(userSettingsTable.userId, id));
      // delete work day details
      await trx.delete(userWorkDayDetailTable).where(eq(userWorkDayDetailTable.userId, id));
      // delete user
      await trx.delete(usersTable).where(eq(usersTable.id, id));
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
