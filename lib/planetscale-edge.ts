import { connect } from "@planetscale/database";

export const planetscaleEdge = connect({
  url: process.env.DATABASE_URL
});
