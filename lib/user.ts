import { db } from "@/lib/db";
import { storageExists, storageUpload } from "@/lib/ms-storage";
import { query } from "@/lib/query";
import { getEarningsForMonth } from "@/logic/earnings-logic";
import { User, UserSettings, UserWorkDayDetail } from "@/types";
import { getCalendarMonth, getCalendarYear } from "@/utils/calendar-utils";
import { getMySQLDate } from "@/utils/date-utils";
import { getUserEarningsDetails } from "@/utils/user-utils";
import { setMonth } from "date-fns";
import { redirect } from "next/navigation";
import { cache } from "react";
import "server-only";

const getUser = cache(async (id: number): Promise<User> => {
  const user = await db
    .selectFrom("user")
    .select([
      "id",
      "email",
      "name",
      "activeDirectoryId",
      "hourlyRate",
      "commission",
      "tax",
      "taxTable",
      "workHours",
      "created",
      "updated",
      "isAdmin",
      "isSpecialist"
    ])
    .where("id", "=", +id)
    .executeTakeFirst();

  if (!user) {
    return redirect("/logout");
  }

  return { ...user, workDayDetails: [], feedback: [] };
});

const getUserWorkDayDetails = cache(async (id: number): Promise<UserWorkDayDetail[]> => {
  const userWorkDayDetail = await db
    .selectFrom("user_work_day_detail")
    .select(["id", "date", "nonCommissionedHours", "extraHours", "sickDay", "userId"])
    .where("userId", "=", +id)
    .execute();

  return userWorkDayDetail;
});

const getUserWorkDayDetailsByDate = cache(async (id: number, month: number, year: number) => {
  const userWorkDayDetail = await db
    .selectFrom("user_work_day_detail")
    .select(["id", "date", "nonCommissionedHours", "extraHours", "sickDay", "userId"])
    .where("userId", "=", +id)
    .where("date", "like", `%${month + 1}-${year}`)
    .execute();

  return userWorkDayDetail;
});

const getUserWithEarnings = cache(async (id: number, activeDate?: Date) => {
  const now = new Date();
  const date = activeDate ?? now;

  const [user, workDayDetail] = await query([
    getUser(id),
    getUserWorkDayDetailsByDate(id, date.getMonth(), date.getFullYear())
  ]);

  if (!user.data) {
    return {
      user: undefined,
      earnings: undefined
    };
  }

  const year = getCalendarYear(now.getFullYear());

  const currentYear = new Date().getFullYear();

  const lastYear = getCalendarYear(currentYear - 1);
  const nextYear = getCalendarYear(currentYear + 1);

  const currentMonth = activeDate ? activeDate.getMonth() : now.getMonth();

  const month = getCalendarMonth(now);

  const activeMonth = activeDate ? getCalendarMonth(activeDate) : month;

  const lastMonth = getCalendarMonth(new Date(currentYear, currentMonth - 1));

  const nextMonth = getCalendarMonth(new Date(currentYear, currentMonth + 1));

  return {
    user: user.data,
    earnings: getUserEarningsDetails(
      {
        commission: user.data.commission ?? 0,
        hourlyRate: user.data.hourlyRate ?? 0,
        tax: user.data.tax ?? 0,
        workHours: user.data.workHours ?? 0,
        taxTable: user.data.taxTable ?? undefined
      },
      year,
      nextYear,
      activeMonth,
      month,
      lastMonth,
      nextMonth,
      (workDayDetail.data ?? []).map(x => ({
        extraHours: x.extraHours ?? 0,
        nonCommissionedHours: x.nonCommissionedHours ?? 0,
        date: x.date ?? new Date().toISOString(),
        id: x.id ?? 0,
        sickDay: x.sickDay ?? false,
        userId: x.userId ?? 0
      }))
    )
  };
});

const getNextPaycheck = cache(async (id: number) => {
  const now = new Date();

  const lastMonth = setMonth(now, new Date().getDate() > 20 ? now.getMonth() : now.getMonth() - 1);

  const [user, workDayDetail] = await query([
    getUser(id),
    getUserWorkDayDetailsByDate(id, lastMonth.getMonth(), lastMonth.getFullYear())
  ]);

  if (!user.data) {
    return {
      user: undefined,
      earnings: undefined
    };
  }

  const currentYear = new Date().getFullYear();

  const currentMonth = now.getMonth();

  const calendarMonth = getCalendarMonth(now);

  const lastCalendarMonth = getCalendarMonth(new Date(currentYear, currentMonth - 1));

  const { hourlyRate, commission, tax, workHours, taxTable } = {
    commission: user.data.commission ?? 0,
    hourlyRate: user.data.hourlyRate ?? 0,
    tax: user.data.tax ?? 0,
    workHours: user.data.workHours ?? 0,
    taxTable: user.data.taxTable ?? undefined
  };

  return {
    user: user.data,
    earnings:
      new Date().getDate() > 20
        ? getEarningsForMonth(
            calendarMonth,
            hourlyRate,
            commission,
            tax,
            workHours,
            workDayDetail.data ?? [],
            taxTable
          )
        : getEarningsForMonth(
            lastCalendarMonth,
            hourlyRate,
            commission,
            tax,
            workHours,
            workDayDetail.data ?? [],
            taxTable
          )
  };
});

const getUserSettings = cache(async (id: number): Promise<UserSettings> => {
  let userSettings = await db
    .selectFrom("user_settings")
    .select([
      "id",
      "userId",
      "closeUserSalaryDialogOnSaveSuccess",
      "closeUserWorkDayDetailsDialogOnSaveSuccess"
    ])
    .where("userId", "=", +id)
    .executeTakeFirst();

  if (!userSettings) {
    // insert
    await db.insertInto("user_settings").values({ userId: +id }).execute();

    userSettings = await db
      .selectFrom("user_settings")
      .selectAll()
      .where("userId", "=", +id)
      .executeTakeFirst();
  }

  return userSettings as UserSettings;
});

const getUserAvatar = cache(async (id: number) => {
  const user = await db
    .selectFrom("user")
    .select(["name", "refreshToken", "activeDirectoryId"])
    .where("id", "=", +id)
    .executeTakeFirst();

  if (!user?.refreshToken) {
    return {
      src: undefined,
      name: user?.name
    };
  }

  const exists = await storageExists(`${user.activeDirectoryId}.jpg`);

  if (exists.success) {
    return {
      src: exists.cdnUrl,
      name: user.name
    };
  }

  const url = `https://login.microsoftonline.com/${process.env.NEXTAUTH_AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.NEXTAUTH_AZURE_AD_CLIENT_ID,
      client_secret: process.env.NEXTAUTH_AZURE_AD_SECRET,
      grant_type: "refresh_token",
      refresh_token: user.refreshToken,
      scope: "offline_access openid User.Read"
    })
  });

  const refreshedTokens = await response.json();

  if (!response.ok) {
    return {
      src: undefined,
      name: user.name
    };
  }

  const [avatarResponse] = await query([
    fetch(`https://graph.microsoft.com/v1.0/me/photos/120x120/$value`, {
      headers: {
        Authorization: `Bearer ${refreshedTokens.access_token}`
      }
    }),
    db
      .updateTable("user")
      .set({
        refreshToken: refreshedTokens.refresh_token,
        accessTokenExpires: Date.now() + refreshedTokens?.ext_expires_in * 1000,
        updated: getMySQLDate()
      })
      .where("id", "=", +id)
      .execute()
  ]);

  if (!avatarResponse?.data?.ok) {
    return {
      src: undefined,
      name: user.name
    };
  }

  const pictureBuffer = await avatarResponse?.data.arrayBuffer();

  // save to Azure Storage
  await storageUpload(pictureBuffer, `${user.activeDirectoryId}.jpg`, "image/jpeg");

  return {
    src: `data:image/jpeg;base64,${btoa(
      String.fromCharCode.apply(null, new Uint8Array(pictureBuffer))
    )}`,
    name: user.name
  };
});

const preloadUserWorkDayDetailsByDate = async (id: number, month: number, year: number) => {
  void getUserWorkDayDetailsByDate(id, month, year);

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  void getUserWorkDayDetailsByDate(id, nextMonth, nextYear);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;

  void getUserWorkDayDetailsByDate(id, prevMonth, prevYear);
};

export {
  getNextPaycheck,
  getUser,
  getUserAvatar,
  getUserSettings,
  getUserWithEarnings,
  getUserWorkDayDetailsByDate,
  preloadUserWorkDayDetailsByDate
};
