import { Prisma } from ".prisma/client";

export type UserWorkDayDetail = {
  id: number;
  date: string;
  extraHours: number;
  nonCommissionedHours: number;
  userId: number;
};

export type User = {
  id: number;
  email: string;
  name: string;
  activeDirectoryId: string;
  refreshToken: string;
  hourlyRate: number;
  commission: number;
  tax: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  isSpecialist: boolean;
  workDayDetails: UserWorkDayDetail[];
};

export type PrismaUserUserWorkDayDetail = {
  id: number;
  date: string;
  extraHours: Prisma.Decimal;
  nonCommissionedHours: Prisma.Decimal;
  userId: number;
};

export type PrismaUser = {
  id: number;
  email: string;
  name: string | null;
  activeDirectoryId: string;
  refreshToken: string | null;
  hourlyRate: number;
  commission: Prisma.Decimal;
  tax: Prisma.Decimal;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  isSpecialist: boolean;
  workDayDetails: PrismaUserUserWorkDayDetail[];
};
