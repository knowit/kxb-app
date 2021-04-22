const DEFAULT_USER_SALARY = {
  hourlyRate: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_HOURLY_RATE,
  commission: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_COMMISSION,
  tax: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_TAX
};

export default DEFAULT_USER_SALARY;
