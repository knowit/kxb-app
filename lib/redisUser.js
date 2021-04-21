import redis from "./redis";

const DATABASE_NAME = "user";

const createDefaultUser = (id, entity) => {
  const now = Date.now();
  return {
    ...entity,
    id,
    hourlyRate: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_HOURLY_RATE,
    commission: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_COMMISSION,
    tax: +process.env.NEXT_PUBLIC_SALARY_DEFAULT_TAX,
    createdAt: now,
    updatedAt: now
  };
};

const getById = async id => {
  const entity = await redis.hget(DATABASE_NAME, id);

  if (!entity) {
    return null;
  }

  return JSON.parse(await redis.hget(DATABASE_NAME, id));
};

const create = async (id, entity) => {
  await redis.hset(DATABASE_NAME, id, JSON.stringify(createDefaultUser(id, entity)));
};

const get = async () => {
  return (await redis.hvals(DATABASE_NAME)).map(entry => {
    return JSON.parse(entry);
  });
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

export default {
  get,
  getById,
  create,
  update,
  upsert,
  remove,
  removeAll
};
