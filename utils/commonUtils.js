export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const isString = value => Object.prototype.toString.call(value) === "[object String]";

export const memoize = func => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = func(...args));
  };
};

export const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);
export const omit = (obj, keys) =>
  Object.keys(obj)
    .filter(k => !keys.includes(k))
    .reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {});
