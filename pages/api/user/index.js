import redisUser from "../../../lib/redisUser";

export default async (req, res) => {
  if (req.method === "GET") {
    const entries = await redisUser.get();

    return res.status(200).json(entries);
  }

  return res.send("Method not allowed.");
};
