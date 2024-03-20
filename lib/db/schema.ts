import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  activeDirectoryId: text("activeDirectoryId").unique().notNull(),
  refreshToken: text("refreshToken"),
  hourlyRate: integer("hourlyRate").notNull(),
  commission: real("commission").notNull(),
  tax: real("tax").notNull(),
  taxTable: text("taxTable"),
  workHours: real("workHours").notNull(),
  created: text("created").notNull(),
  updated: text("updated").notNull(),
  isAdmin: integer("isAdmin", { mode: "boolean" }).notNull(),
  isSpecialist: integer("isSpecialist", { mode: "boolean" }).notNull(),
  accessTokenExpires: integer("accessTokenExpires")
});

export const userWorkDayDetailTable = sqliteTable("user_work_day_detail", {
  id: integer("id").primaryKey(),
  date: text("date").notNull(),
  nonCommissionedHours: real("nonCommissionedHours"),
  extraHours: real("extraHours"),
  sickDay: integer("sickDay", { mode: "boolean" }),
  userId: integer("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" })
});

// export const userWorkDayRelations = relations(usersTable, ({ one }) => ({
//   workDayDetails: one(userWorkDayDetailTable)
// }));

export const userSettingsTable = sqliteTable("user_settings", {
  id: integer("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  closeUserSalaryDialogOnSaveSuccess: integer("closeUserSalaryDialogOnSaveSuccess", {
    mode: "boolean"
  }),
  closeUserWorkDayDetailsDialogOnSaveSuccess: integer(
    "closeUserWorkDayDetailsDialogOnSaveSuccess",
    { mode: "boolean" }
  )
});

export const userFeedbackTable = sqliteTable("user_feedback", {
  id: integer("id").primaryKey(),
  date: text("date").notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => usersTable.id),
  feedback: text("feedback").notNull(),
  reaction: integer("reaction")
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertUserWorkDayDetail = typeof userWorkDayDetailTable.$inferInsert;
export type SelectUserWorkDayDetail = typeof userWorkDayDetailTable.$inferSelect;

export type InsertUserSettings = typeof userSettingsTable.$inferInsert;
export type SelectUserSettings = typeof userSettingsTable.$inferSelect;

export type InsertUserFeedback = typeof userFeedbackTable.$inferInsert;
export type SelectUserFeedback = typeof userFeedbackTable.$inferSelect;
