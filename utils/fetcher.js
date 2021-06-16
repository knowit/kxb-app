import { debounce } from "./commonUtils";

export async function fetcher(...args) {
  const res = await fetch(...args);

  return res.json();
}

export async function fetchWithToken(url, token) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
}

export async function fetchBlobWithToken(url, token) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.blob();
}

export const debounceFetch = debounce(async (url, options = {}) => await fetch(url, options), 2000);
