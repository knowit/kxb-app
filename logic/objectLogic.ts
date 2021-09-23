export const removeDuplicates = (values: [] = []) => {
  let cached: { [key: string]: number } = {};

  values.forEach(value => {
    if (cached[value]) return;
    cached[value] = 1;
  });

  return Object.keys(cached);
};
