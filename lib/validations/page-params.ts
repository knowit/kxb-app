import * as z from "zod";

export const selectedYearMonthPageParams = z.object({
  year: z.coerce.number(),
  month: z.coerce.number()
});
