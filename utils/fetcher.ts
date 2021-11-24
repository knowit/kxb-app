export const fetcher = (url: string) => fetch(url).then(res => res.json());

export class ApiError extends Error {
  statusCode = null;

  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

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

  if (!res.ok) {
    throw new ApiError(res.status, "An error occurred while fetching the data.");
  }

  return res.blob();
}
