import { connect } from "@planetscale/database";

type Row = Record<string, any> | any[];

export const planetscaleEdge = connect({
  url: process.env.DATABASE_URL
  // TODO: Ensure cache is working as expected with
  // latest Next.js versions
  // fetch: (url, options) => {
  //   return fetch(url, {
  //     ...options,
  //     // next.js cache policy is way to aggressive
  //     // so we disable it here, ensuring that the
  //     // database response is always fresh
  //     cache: "no-cache"
  //   });
  // }
});

export type { Row };
