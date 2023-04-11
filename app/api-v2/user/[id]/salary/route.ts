import { planetscaleEdge } from "@/lib/planetscale-edge";
import { userSalaryDetailSchema } from "@/lib/validations/user";
import { type ServerRuntime } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export const runtime: ServerRuntime = "experimental-edge";

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

    const res = await request.json();

    const { commission, hourlyRate, tax, workHours, taxTable } =
      await userSalaryDetailSchema.parseAsync(res);

    await planetscaleEdge.execute(
      "UPDATE user SET commission = ?, hourlyRate = ?, tax = ?, workHours = ?, taxTable = ? WHERE id = ?",
      [commission, hourlyRate, tax, workHours, taxTable, id]
    );

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
