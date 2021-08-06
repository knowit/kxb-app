import planetscaleDatabase from "@/lib/planetscale/planetscale";

const TABLE_NAME = "job_offer";
const createObject = object => ({ ...object });

const get = async () => {
  const [rows] = await planetscaleDatabase.query(`
    SELECT * FROM ${TABLE_NAME};
  `);

  return rows?.map(row => createObject(row));
};

const getById = async id => {
  const [rows] = await planetscaleDatabase.query(
    `
        select * from ${TABLE_NAME}
        where id = ?;
    `,
    [id]
  );

  return createObject(rows?.[0]);
};

const getByUuid = async uuid => {
  const [rows] = await planetscaleDatabase.query(
    `
        select * from ${TABLE_NAME}
        where uuid = ?;
    `,
    [uuid]
  );

  return createObject(rows?.[0]);
};

const insert = async (firstName, lastName, email, phone, hourlyRate, commission) => {
  const [insert] = await planetscaleDatabase.query(
    `
        insert into ${TABLE_NAME} (uuid, firstName, lastName, email, phone, hourlyRate, commission)
        values (uuid(), ?, ?, ?, ?, ?, ?);
      `,
    [firstName, lastName, email, phone, hourlyRate, commission]
  );

  return insert;
};

const update = async (id, firstName, lastName, email, phone, hourlyRate, commission) => {
  const [insert] = await planetscaleDatabase.query(
    `
        update ${TABLE_NAME}
        set firstName = ?, lastName = ?, email = ?, phone = ?, hourlyRate = ?, commission = ?
        where id = ?
      `,
    [firstName, lastName, email, phone, hourlyRate, commission, id]
  );

  return insert;
};

const remove = async id => {
  const [insert] = await planetscaleDatabase.query(
    `
        delete from ${TABLE_NAME}
        where id = ?
      `,
    [id]
  );

  return insert;
};

const planetscaleTableJobOffer = {
  get,
  getById,
  getByUuid,
  insert,
  update,
  remove
};

export default planetscaleTableJobOffer;
