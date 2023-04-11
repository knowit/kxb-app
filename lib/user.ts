import "server-only";

import { queryBuilder } from "@/lib/planetscale";
import { planetscaleEdge, Row } from "@/lib/planetscale-edge";
import { query } from "@/lib/query";
import { User, UserFeedback, UserSettings, UserWorkDayDetail } from "@/types";
import { getCalendarMonth, getCalendarYear } from "@/utils/calendar-utils";
import { getUserEarningsDetails } from "@/utils/user-utils";
import { redirect } from "next/navigation";
import { cache } from "react";

const createUser = (
  row: Row,
  workDayDetails?: UserWorkDayDetail[],
  feedback?: UserFeedback[]
): User => {
  // check if row is an array
  const user = (Array.isArray(row) ? row[0] : row) as User;

  return {
    ...user,
    // convert string decimal to number
    tax: Number(user?.tax ?? 0),
    workHours: Number(user?.workHours ?? 0),
    commission: Number(user?.commission ?? 0),
    hourlyRate: Number(user?.hourlyRate ?? 0),
    isAdmin: Boolean(user?.isAdmin ?? false),
    isSpecialist: Boolean(user?.isSpecialist ?? false),
    workDayDetails: workDayDetails ?? user?.workDayDetails ?? [],
    feedback: feedback ?? user?.feedback ?? []
  };
};

const getUser = cache(async (id: string): Promise<User> => {
  const { rows } = await planetscaleEdge.execute(
    "SELECT id, email, name, activeDirectoryId, hourlyRate, commission, tax, taxTable, workHours, created, updated, isAdmin, isSpecialist FROM user WHERE id = ?",
    [id]
  );

  const row = rows?.[0];

  if (!row) {
    return redirect("/logout");
  }

  return createUser(row);
});

const getUserWorkDayDetails = cache(async (id: string) => {
  const { rows } = await planetscaleEdge.execute(
    "SELECT uwdd.id, uwdd.date, uwdd.nonCommissionedHours, uwdd.extraHours, uwdd.sickDay, uwdd.userId FROM user LEFT JOIN user_work_day_detail AS uwdd ON user.id = uwdd.userId WHERE user.id = ?",
    [id]
  );

  const userWorkDayDetail = rows as UserWorkDayDetail[];

  return (userWorkDayDetail ?? []).map(userWorkDayDetail => ({
    ...userWorkDayDetail,
    nonCommissionedHours: Number(userWorkDayDetail.nonCommissionedHours),
    extraHours: Number(userWorkDayDetail.extraHours),
    sickDay: Boolean(userWorkDayDetail.sickDay)
  })) as UserWorkDayDetail[];
});

const getUserWithWorkDayDetails = cache(async (id: string): Promise<User> => {
  const [userResult, userWorkDayDetailResult] = await query([
    getUser(id),
    getUserWorkDayDetails(id)
  ]);

  if (!userResult.data) {
    return redirect("/logout");
  }

  return {
    ...userResult.data,
    workDayDetails: userWorkDayDetailResult.data ?? []
  };
});

const getUserWorkDayDetailsByDate = cache(async (id: string, month: number, year: number) => {
  const { rows } = await planetscaleEdge.execute(
    "select * from user_work_day_detail where userId = ? AND date like '%?-?'",
    [id, month + 1, year]
  );

  const userWorkDayDetail = rows as UserWorkDayDetail[];

  return (userWorkDayDetail ?? []).map(userWorkDayDetail => ({
    ...userWorkDayDetail,
    nonCommissionedHours: Number(userWorkDayDetail.nonCommissionedHours),
    extraHours: Number(userWorkDayDetail.extraHours),
    sickDay: Boolean(userWorkDayDetail.sickDay)
  })) as UserWorkDayDetail[];
});

const getUserWithEarnings = cache(async (id: string, activeDate?: Date) => {
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

const getUserSettings = cache(async (id: string): Promise<UserSettings> => {
  const { rows } = await planetscaleEdge.execute("SELECT * FROM user_settings WHERE userId = ?", [
    id
  ]);

  if (!rows?.length) {
    // insert
    await planetscaleEdge.execute("INSERT INTO user_settings (userId) VALUES (?)", [id]);

    const { rows } = await planetscaleEdge.execute("SELECT * FROM user_settings WHERE userId = ?", [
      id
    ]);

    const userSettings = rows?.[0] as UserSettings;

    return {
      ...userSettings,
      closeUserSalaryDialogOnSaveSuccess: Boolean(userSettings.closeUserSalaryDialogOnSaveSuccess),
      closeUserWorkDayDetailsDialogOnSaveSuccess: Boolean(
        userSettings.closeUserWorkDayDetailsDialogOnSaveSuccess
      )
    };
  }

  const userSettings = rows?.[0] as UserSettings;

  return {
    ...userSettings,
    closeUserSalaryDialogOnSaveSuccess: Boolean(userSettings.closeUserSalaryDialogOnSaveSuccess),
    closeUserWorkDayDetailsDialogOnSaveSuccess: Boolean(
      userSettings.closeUserWorkDayDetailsDialogOnSaveSuccess
    )
  };
});

const getUserAvatar = cache(async (id: string) => {
  const user = await queryBuilder
    .selectFrom("user")
    .select(["name", "refreshToken"])
    .where("id", "=", +id)
    .executeTakeFirst();

  if (!user?.refreshToken) {
    return {
      src: undefined,
      name: user?.name
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
    planetscaleEdge.execute(
      "UPDATE user SET refreshToken = ?, accessTokenExpires = ?, updated = ? WHERE id = ?",
      [
        refreshedTokens.refresh_token,
        Date.now() + refreshedTokens?.ext_expires_in * 1000,
        new Date(),
        id
      ]
    )
  ]);

  if (!avatarResponse?.data?.ok) {
    return {
      src: undefined,
      name: user.name
    };
  }

  const pictureBuffer = await avatarResponse?.data.arrayBuffer();

  return {
    src: `data:image/jpeg;base64,${btoa(
      String.fromCharCode.apply(null, new Uint8Array(pictureBuffer))
    )}`,
    name: user.name
  };
});

const preloadUserWorkDayDetailsByDate = async (id: string, month: number, year: number) => {
  void getUserWorkDayDetailsByDate(id, month, year);

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  void getUserWorkDayDetailsByDate(id, nextMonth, nextYear);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;

  void getUserWorkDayDetailsByDate(id, prevMonth, prevYear);
};

export {
  createUser,
  getUser,
  getUserWithEarnings,
  getUserAvatar,
  getUserSettings,
  getUserWorkDayDetailsByDate,
  preloadUserWorkDayDetailsByDate
};
