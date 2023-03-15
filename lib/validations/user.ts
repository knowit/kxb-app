import * as z from "zod";

export const userSalaryDetailSchema = z.object({
  commission: z.number().min(0).max(100),
  hourlyRate: z.number().min(0),
  tax: z.number().min(0).max(100),
  workHours: z.number().min(0).max(24)
});
