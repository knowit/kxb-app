import { getSession } from "next-auth/client";
import redisUser from "../../../lib/redisUser";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const { id, body } = req.query;

  const user = await redisUser.getById(id);

  if (user === null || user === undefined) {
    return res.status(404).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(user);
  }

  if (req.method === "PUT" && body) {
    await redisUser.update(user.id, { ...body });
    return res.status(200).end();
  }

  if (req.method === "DELETE") {
    await redisUser.remove(id);
    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
};
