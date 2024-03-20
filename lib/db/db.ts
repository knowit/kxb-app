import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
});

export const db = drizzle(client);

export const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1) throw new Error("Found non unique or inexistent value");
  return values[0];
};
export const takeFirst = <T extends any[]>(values: T): T[number] => {
  if (!values.length) return undefined;
  return values[0];
};
