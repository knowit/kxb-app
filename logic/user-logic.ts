import { User, UserWorkDayDetail } from "@/types";

export const getUserWorkDayDetails = (user: User, formattedDate: string): UserWorkDayDetail => {
  return (
    (user?.workDayDetails ?? []).find(workDayDetail => workDayDetail.date === formattedDate) ?? {
      id: 0,
      date: formattedDate,
      nonCommissionedHours: 0,
      extraHours: 0,
      sickDay: false,
      userId: user.id
    }
  );
};
