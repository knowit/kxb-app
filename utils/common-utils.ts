type Procedure = (...args: any[]) => void;

function debounce<T extends Procedure>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  const debounced = function (this: any, ...args: any[]) {
    const context = this;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };

  return debounced as T;
}

export const isString = (value: any) => Object.prototype.toString.call(value) === "[object String]";

export const memoize = func => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = func(...args));
  };
};

export const range = (min: number, max: number) =>
  Array.from({ length: max - min + 1 }, (_, i) => min + i);

export const omit = (obj: {}, keys: string[]) =>
  Object.keys(obj)
    .filter(k => !keys.includes(k))
    .reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {});

export const capitalize = (str: string): string =>
  str.length === 0 ? str : `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const getAbsoluteUrl = (path?: string) => {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? "https://kxb.app";

  if (path) {
    return `${base}${path}`;
  }

  return base;
};

export const getInitials = (name?: string) => {
  if (!name) {
    return "";
  }

  // take first letter of each word and capitalize it
  const initials = name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase();

  return initials;
};

export { debounce };
