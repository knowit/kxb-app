import "server-only";

import { planetscaleEdge } from "@/lib/planetscale-edge";
import { query } from "@/lib/query";
import { User, UserSettings, UserWorkDayDetail } from "@/types";
import { getCalendarMonth, getCalendarYear } from "@/utils/calendar-utils";
import { getUserEarningsDetails } from "@/utils/user-utils";
import { cache } from "react";

const getUser = cache(async (id: string): Promise<User | undefined> => {
  const { rows } = await planetscaleEdge.execute("SELECT * FROM user WHERE id = ?", [id]);

  if (!rows?.length) {
    return undefined;
  }

  const user = rows[0] as User;

  if (!user) {
    return undefined;
  }

  return {
    ...user,
    // convert string decimal to number
    tax: Number(rows[0]?.["tax"]),
    workHours: Number(rows[0]?.["workHours"]),
    commission: Number(rows[0]?.["commission"]),
    hourlyRate: Number(rows[0]?.["hourlyRate"]),
    workDayDetails: user?.workDayDetails ?? [],
    feedback: user?.feedback ?? []
  };
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
  }));
});

const getUserWithWorkDayDetails = cache(async (id: string) => {
  const [userResult, userWorkDayDetailResult] = await query([
    getUser(id),
    getUserWorkDayDetails(id)
  ]);

  return {
    ...userResult.data,
    workDayDetails: userWorkDayDetailResult.data
  };
});

const getUserEarnings = cache(async (id: string, activeDate?: Date) => {
  const user = await getUserWithWorkDayDetails(id);

  if (!user) {
    return undefined;
  }

  const now = new Date();

  const year = getCalendarYear(now.getFullYear());

  const currentYear = new Date().getFullYear();

  const lastYear = getCalendarYear(currentYear - 1);
  const nextYear = getCalendarYear(currentYear + 1);

  const currentMonth = activeDate ? activeDate.getMonth() : now.getMonth();

  const month = getCalendarMonth(now);

  const activeMonth = activeDate ? getCalendarMonth(activeDate) : month;

  const lastMonth = getCalendarMonth(new Date(currentYear, currentMonth - 1));

  const nextMonth = getCalendarMonth(new Date(currentYear, currentMonth + 1));

  return getUserEarningsDetails(
    {
      commission: user.commission ?? 0,
      hourlyRate: user.hourlyRate ?? 0,
      tax: user.tax ?? 0,
      workHours: user.workHours ?? 0
    },
    year,
    nextYear,
    activeMonth,
    month,
    lastMonth,
    nextMonth,
    (user.workDayDetails ?? []).map(x => ({
      extraHours: x.extraHours ?? 0,
      nonCommissionedHours: x.nonCommissionedHours ?? 0,
      date: x.date ?? new Date().toISOString(),
      id: x.id ?? 0,
      sickDay: x.sickDay ?? false,
      userId: x.userId ?? 0
    }))
  );
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
  const user = await getUser(id);

  if (!user?.refreshToken) {
    return undefined;
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
    return undefined;
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
    return undefined;
  }

  const pictureBuffer = await avatarResponse?.data.arrayBuffer();

  return {
    src: `data:image/jpeg;base64,${btoa(
      String.fromCharCode.apply(null, new Uint8Array(pictureBuffer))
    )}`,
    name: user.name
  };
});

export { getUser, getUserEarnings, getUserAvatar, getUserSettings };
