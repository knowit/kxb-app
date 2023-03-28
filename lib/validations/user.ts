import * as z from "zod";

export const userProfileSchema = z.object({
  id: z.number().min(0).optional(),
  name: z.string().min(3).max(100)
});

export const userSalaryDetailSchema = z.object({
  commission: z.number().min(0).max(100),
  hourlyRate: z.number().min(0),
  tax: z.number().min(0).max(100),
  workHours: z.number().min(0).max(24)
});

export const userWorkDayDetailSchema = z.object({
  id: z.number().min(0).optional(),
  date: z.string(),
  nonCommissionedHours: z.number().min(0).max(24),
  extraHours: z.number().min(0).max(24),
  sickDay: z.boolean()
});

export const userSettingsSchema = z.object({
  id: z.number().min(0).optional(),
  userId: z.number().min(0).optional(),
  closeUserSalaryDialogOnSaveSuccess: z.boolean(),
  closeUserWorkDayDetailsDialogOnSaveSuccess: z.boolean()
});

export const userFeedbackSchema = z.object({
  id: z.number().min(0).optional(),
  date: z.string().optional(),
  userId: z.number().min(0),
  feedback: z.string().min(3).max(1000),
  reaction: z.number().min(1).max(4)
});
