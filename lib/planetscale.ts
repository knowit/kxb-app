import { cast } from "@planetscale/database";
import Big from "big.js";
import type { Generated } from "kysely";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

export interface UserTable {
  id: Generated<number>;
  email: string;
  name?: string;
  activeDirectoryId: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  hourlyRate: number;
  commission: number;
  tax: number;
  taxTable?: string;
  workHours: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  isSpecialist: boolean;
  workDayDetails: UserWorkDayDetailTable[];
  feedback: UserFeedbackTable[];
}

export interface UserWorkDayDetailTable {
  id: Generated<number>;
  date: string;
  nonCommissionedHours: number;
  extraHours: number;
  sickDay: boolean;
  user: Generated<UserTable>;
  userId: number;
}

export interface UserFeedbackTable {
  id: Generated<number>;
  date: string;
  user: Generated<UserTable>;
  userId: number;
  feedback: string;
  reaction: number;
}

export interface UserSettings {
  id: Generated<number>;
  user: Generated<UserTable>;
  userId: number;
  closeUserSalaryDialogOnSaveSuccess: Generated<boolean>;
  closeUserWorkDayDetailsDialogOnSaveSuccess: Generated<boolean>;
}

export interface Database {
  user: UserTable;
  user_work_day_detail: UserWorkDayDetailTable;
  user_feedback: UserFeedbackTable;
  user_settings: UserSettings;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
    cast: (field, value) => {
      if (field.type === "INT8") {
        return value === "1";
      }

      if (value && field.type === "DECIMAL") {
        return Big(value).toNumber();
      }

      return cast(field, value);
    }
  })
});
