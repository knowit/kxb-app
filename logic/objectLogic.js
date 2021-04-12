export const removeDuplicates = (values = []) => {
  const cached = {};

  values.forEach(value => {
    if (cached[value]) return;
    cached[value] = 1;
  });

  return Object.keys(cached);
};
