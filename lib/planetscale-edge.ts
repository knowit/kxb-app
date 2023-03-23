import { connect } from "@planetscale/database";

type Row = Record<string, any> | any[];

export const planetscaleEdge = connect({
  url: process.env.DATABASE_URL,
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      // next.js cache policy is way to aggressive
      // so we disable it here, ensuring that the
      // database response is always fresh
      cache: "no-cache"
    });
  }
});

export type { Row };
