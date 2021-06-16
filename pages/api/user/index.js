import { getSession } from "next-auth/client";
import redisUser from "../../../lib/redisUser";
import { sessionUserIsAdmin } from "../../../utils/sessionUtils";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  if (!sessionUserIsAdmin(session)) {
    return res.status(403).end();
  }

  if (req.method === "GET") {
    const entries = await redisUser.get();

    return res.status(200).json(entries);
  }

  return res.send("Method not allowed.");
};
