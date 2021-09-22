import DEFAULT_USER_SALARY from "@/constants/defaultUserSalary";
import { PrismaUser, User, UserWorkDayDetail } from "../types";
import prisma from "./prisma";

const createPrismaUser = (user: PrismaUser): User => {
  return {
    ...user,
    tax: +(user.tax ?? DEFAULT_USER_SALARY.tax),
    commission: +(user.commission ?? DEFAULT_USER_SALARY.commission),
    workDayDetails: (user?.workDayDetails ?? []).map(
      workDayDetail =>
        <UserWorkDayDetail>{
          ...workDayDetail,
          extraHours: +(workDayDetail?.extraHours ?? 0),
          nonCommissionedHours: +(workDayDetail?.nonCommissionedHours ?? 0)
        }
    )
  };
};

const get = async (
  options = {
    include: {
      workDayDetails: true
    }
  }
): Promise<User[]> => {
  const entries = await prisma.user.findMany(options);

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

const prismaUser = {
  get,
  getByActiveDirectoryId,
  getByEmail,
  getById,
  deleteById
};

export default prismaUser;
