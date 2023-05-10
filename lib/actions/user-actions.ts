"use server";

import { db } from "@/lib/db";
import { userWorkDayDetailSchema } from "@/lib/validations/user";
import { UserWorkDayDetail } from "@/types";

type ActionResponse = {
  ok: boolean;
  error?: string;
};

async function mutateUserWorkDayDetail(
  userId: number,
  userWorkDayDetail?: Omit<UserWorkDayDetail, "id" | "userId"> & { id?: number }
): Promise<ActionResponse> {
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
      const insertResult = await db
        .insertInto("user_work_day_detail")
        .values({
          userId,
          date: date,
          nonCommissionedHours: nonCommissionedHours,
          extraHours: extraHours,
          sickDay: sickDay
        })
        .executeTakeFirst();
      return { ok: (insertResult?.numInsertedOrUpdatedRows ?? 0) > 0 };
    }

    // delete
    if (userWorkDayDetail?.extraHours === 0 && userWorkDayDetail?.nonCommissionedHours === 0) {
      const deleteResult = await db
        .deleteFrom("user_work_day_detail")
        .where("id", "=", id)
        .executeTakeFirst();
      return { ok: deleteResult.numDeletedRows > 0 };
    }

    // update
    const updateResult = await db
      .updateTable("user_work_day_detail")
      .set({ nonCommissionedHours, extraHours, sickDay })
      .where("id", "=", id)
      .executeTakeFirst();

    return { ok: updateResult.numUpdatedRows > 0 };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

export { mutateUserWorkDayDetail };
