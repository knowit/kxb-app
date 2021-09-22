export const getUserWorkDayDetails = (user, formattedDate) => {
  return (
    (user?.workDayDetails ?? []).find(workDayDetail => workDayDetail.date === formattedDate) ?? {
      date: formattedDate,
      nonCommissionedHours: 0,
      extraHours: 0,
      userId: user.id
    }
  );
};
