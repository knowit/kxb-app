export const getUserWorkDayDetails = (userWorkDayDetails, formattedDate) => {
  return (
    userWorkDayDetails?.[formattedDate] ?? {
      nonCommissionedHours: 0,
      extraHours: 0
    }
  );
};
