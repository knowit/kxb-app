import { getCalendarMonth, getCalendarYear } from "@/utils/calendar-utils";
import { getUserEarningsDetails } from "@/utils/user-utils";
import { cache } from "react";
import prisma from "./prisma";

const getUserWithWorkDayDetails = cache(async (activeDirectoryId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      activeDirectoryId: activeDirectoryId
    },
    include: {
      workDayDetails: true
    }
  });

  return user;
});

const getUserEarnings = cache(async (activeDirectoryId: string) => {
  const user = await getUserWithWorkDayDetails(activeDirectoryId);

  if (!user) {
    return null;
  }

  const now = new Date();

  const year = getCalendarYear(now.getFullYear());

  const currentYear = new Date().getFullYear();

  const lastYear = getCalendarYear(currentYear - 1);
  const nextYear = getCalendarYear(currentYear + 1);

  const currentMonth = now.getMonth() + 1;

  const month = getCalendarMonth(now);

  const lastMonth = getCalendarMonth(new Date(currentYear, currentMonth - 1));

  const nextMonth = getCalendarMonth(new Date(currentYear, currentMonth + 1));

  return getUserEarningsDetails(
    {
      commission: user.commission.toNumber(),
      hourlyRate: user.hourlyRate,
      tax: user.tax.toNumber(),
      workHours: user.workHours.toNumber()
    },
    year,
    nextYear,
    month,
    month,
    lastMonth,
    nextMonth,
    (user.workDayDetails ?? []).map(x => ({
      ...x,
      extraHours: x.extraHours.toNumber(),
      nonCommissionedHours: x.nonCommissionedHours.toNumber()
    }))
  );
});

export { getUserEarnings };
