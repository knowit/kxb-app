export const fetcher = (url: string) => fetch(url).then(res => res.json());

export async function fetchWithToken(url: string, token: string): Promise<any> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
}

export async function fetchBlobWithToken(url: string, token: string): Promise<Blob> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.blob();
}
