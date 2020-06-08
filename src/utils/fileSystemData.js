import fs from "fs";
import path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const getFileSystemDataFiles = async () => {
  return await readdir(path.join(process.cwd(), "/__data__/"));
};

export const getFileSystemDataYears = async () => {
  const files = await getFileSystemDataFiles();

  return await Promise.all(
    files?.map(
      async file =>
        JSON.parse(await readFile(path.join(process.cwd(), `/__data__/${file}`), "UTF-8"))?.data
          ?.year
    )
  );
};

export const getFileSystemDataForYear = async year => {
  const data = await readFile(path.join(process.cwd(), `/__data__/${year}.json`), "UTF-8");
  return JSON.parse(data ?? {});
};
