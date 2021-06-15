import { getSession } from "next-auth/client";
import redisUser from "../../../lib/redisUser";

export default async function Users(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const entries = await redisUser.get();

    return res.status(200).json(entries);
  }

  return res.send("Method not allowed.");
}
