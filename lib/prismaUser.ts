import DEFAULT_USER_SALARY from "@/constants/defaultUserSalary";
import { PrismaUser, User } from "@/types";
import prisma from "./prisma";

// Convert decimals to number
const createPrismaUser = (user: PrismaUser): User => {
  return {
    ...user,
    tax: +(user?.tax ?? DEFAULT_USER_SALARY.tax),
    commission: +(user?.commission ?? DEFAULT_USER_SALARY.commission),
    workDayDetails: (user?.workDayDetails ?? []).map(workDayDetail => ({
      ...workDayDetail,
      extraHours: +(workDayDetail?.extraHours ?? 0),
      nonCommissionedHours: +(workDayDetail?.nonCommissionedHours ?? 0)
    }))
  };
};

const get = async (): Promise<User[]> => {
  const entries = await prisma.user.findMany({
    orderBy: {
      updated: "desc"
    },
    include: {
      workDayDetails: true
    }
  });

  return entries.map(entry => createPrismaUser(entry));
};

const getById = async (
  id: number,
  options = {
    include: {
      workDayDetails: true
    }
  }
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id
    },
    ...options
  });

  return createPrismaUser(user);
};

const getByActiveDirectoryId = async (
  activeDirectoryId: string,
  options = {
    include: {
      workDayDetails: true
    }
  }
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      activeDirectoryId: activeDirectoryId
    },
    ...options
  });

  return createPrismaUser(user);
};

const getByEmail = async (
  email: string,
  options = {
    include: {
      workDayDetails: true
    }
  }
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
    ...options
  });

  return createPrismaUser(user);
};

const deleteById = async (id: number): Promise<void> => {
  await prisma.user.delete({
    where: {
      id: +id
    }
  });

  await prisma.userWorkDayDetail.deleteMany({
    where: {
      userId: +id
    }
  });
};

const update = async (...parameters: Parameters<typeof prisma.user.update>): Promise<void> => {
  await prisma.user.update(...parameters);
};

const upsert = async (...parameters: Parameters<typeof prisma.user.upsert>): Promise<void> => {
  await prisma.user.upsert(...parameters);
};

const prismaUser = {
  get,
  getByActiveDirectoryId,
  getByEmail,
  getById,
  deleteById,
  update,
  upsert
};

export default prismaUser;
