const DEFAULT_USER_SALARY = {
  hourlyRate: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_HOURLY_RATE,
  commission: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_COMMISSION,
  tax: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_TAX,
  workHours: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_WORK_HOURS
};

export { DEFAULT_USER_SALARY };
