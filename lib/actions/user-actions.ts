"use server";

import { db } from "@/lib/db/db";
import { userWorkDayDetailSchema } from "@/lib/validations/user";
import { User, UserWorkDayDetail } from "@/types";
import { eq } from "drizzle-orm";
import { userWorkDayDetailTable, usersTable } from "../db/schema";
import { getEdgeFriendlyToken } from "../token";
import { getUser } from "../user";

type ActionResponse = {
  ok: boolean;
  error?: string;
};

async function mutateUserWorkDayDetail(
  userId: number,
  userWorkDayDetail?: Omit<UserWorkDayDetail, "id" | "userId"> & { id?: number }
): Promise<ActionResponse> {
  const token = await getEdgeFriendlyToken();
  if (userId !== token.id) {
    return new Response("Bad request", {
      status: 400
    });
  }
  try {
    const { id, date, extraHours, nonCommissionedHours, sickDay } =
      userWorkDayDetailSchema.parse(userWorkDayDetail);

    if (!id && extraHours === 0 && nonCommissionedHours === 0) {
      return {
        ok: true
      };
    }

    // create
    if (!id) {
      const insertResult = await db.insert(userWorkDayDetailTable).values({
        userId,
        date: date,
        nonCommissionedHours: nonCommissionedHours,
        extraHours: extraHours,
        sickDay: sickDay
      });
      return { ok: (insertResult?.rowsAffected ?? 0) > 0 };
    }

    // delete
    if (userWorkDayDetail?.extraHours === 0 && userWorkDayDetail?.nonCommissionedHours === 0) {
      const deleteResult = await db
        .delete(userWorkDayDetailTable)
        .where(eq(userWorkDayDetailTable.id, id));
      return { ok: deleteResult.rowsAffected > 0 };
    }

    // update
    const updateResult = await db
      .update(userWorkDayDetailTable)
      .set({ nonCommissionedHours, extraHours, sickDay })
      .where(eq(userWorkDayDetailTable.id, id));

    return { ok: updateResult.rowsAffected > 0 };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

async function updateUser(
  userId: number,
  user: Omit<Partial<User>, "feedback" | "workDayDetails">
) {
  const token = await getEdgeFriendlyToken();
  if (userId !== token.id) {
    return new Response("Bad request", {
      status: 400
    });
  }

  try {
    const updateResult = await db.update(usersTable).set(user).where(eq(usersTable.id, +userId));

    return { ok: updateResult.rowsAffected > 0 };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

async function refreshUserAvatar() {
  const token = await getEdgeFriendlyToken();

  if (!token) {
    return;
  }

  const user = await getUser(token.id);

  if (!user) {
    return;
  }
}

export { mutateUserWorkDayDetail, updateUser };
