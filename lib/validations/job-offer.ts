import * as z from "zod";

export const createJobOfferSchema = z.object({
  commission: z.number().min(0).max(100),
  guaranteeSalary: z.number().min(0),
  name: z.string().min(3).max(100),
  email: z.string().email()
});
