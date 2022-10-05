import dbConnect from "../../lib/dbConnect";
import Monitor from "../../models/Monitor";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const userId = req.query.userId;
        if (userId) {
          const monitors = await Monitor.find({ownder: userId});
          res.status(200).json({ success: true, data: monitors });
        } else {
          res.status(400).json({ success: false });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const monitor = await Monitor.create(req.body);
        res.status(201).json({ success: true, data: monitor });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
      } catch (error) {
        res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
      } catch (error) {
        res.status(400).json({ success: false });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
