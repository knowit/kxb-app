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

  return res.blob();
}
