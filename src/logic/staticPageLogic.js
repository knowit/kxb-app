import { getFileSystemDataYears } from "../utils/fileSystemData";
import { getMonthNames } from "./dateLogic";
import { removeDuplicates } from "./objectLogic";

export const getHomePageProps = async (props = {}) => {
  return {
    ...props,
    months: getMonthNames(),
    years: await getFileSystemDataYears()
  };
};

export const getYearPageProps = async (props = {}) => {
  return {
    ...props,
    months: getMonthNames(),
    years: await getFileSystemDataYears()
  };
};

export const getYearPageStaticPaths = async () => {
  const years = await getFileSystemDataYears();

  return removeDuplicates(years)?.reduce((result, year) => {
    result.push(`/year/${year}`);
    return result;
  }, []);
};

export const getMonthPageStaticPaths = async () => {
  const years = await getFileSystemDataYears();
  const months = getMonthNames();

  return removeDuplicates(years)?.reduce((result, year) => {
    months.forEach(month => result.push(`/year/${year}/${month.toLowerCase()}`));

    return result;
  }, []);
};
