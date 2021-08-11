import DEFAULT_USER_SALARY from "@/constants/defaultUserSalary";
import redis from "@/lib/redis";
import { getFormattedLongDate } from "@/utils/dateUtils";

const DATABASE_NAME = "user";

const createDefaultUser = (id, entity) => {
  const now = Date.now();
  return {
    ...entity,
    id,
    hourlyRate: DEFAULT_USER_SALARY.hourlyRate,
    commission: DEFAULT_USER_SALARY.commission,
    tax: DEFAULT_USER_SALARY.tax,
    createdAt: now,
    updatedAt: now
  };
};

const createEntry = entry => ({
  ...entry,
  createdAtFormatted: getFormattedLongDate(new Date(entry.createdAt)),
  updatedAtFormatted: getFormattedLongDate(new Date(entry.updatedAt))
});

const getById = async id => {
  const entity = await redis.hget(DATABASE_NAME, id);

  if (!entity) {
    return null;
  }

  return createEntry(JSON.parse(await redis.hget(DATABASE_NAME, id)));
};

const create = async (id, entity) => {
  await redis.hset(DATABASE_NAME, id, JSON.stringify(createDefaultUser(id, entity)));
};

const get = async () => {
  return (await redis.hvals(DATABASE_NAME))
    .map(entry => createEntry(JSON.parse(entry)))
    .sort((a, b) => b.updatedAt - a.updatedAt);
};

const update = async (id, updatedEntity) => {
  const entity = await getById(id);

  await redis.hset(
    DATABASE_NAME,
    id,
    JSON.stringify({
      ...entity,
      ...updatedEntity,
      updatedAt: Date.now()
    })
  );
};

const upsert = async (id, entity) => {
  const existingEntity = await getById(id);

  if (existingEntity) {
    await update(id, entity);
    return;
  }

  await create(id, entity);
};

const remove = async id => {
  await redis.hdel(DATABASE_NAME, id);
};

const removeAll = async () => {
  await redis.del(DATABASE_NAME);
};

const redisUser = {
  get,
  getById,
  create,
  update,
  upsert,
  remove,
  removeAll
};

export default redisUser;
