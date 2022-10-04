import dbConnect from "../../lib/dbConnect";
import Monitor from "../../models/Monitor";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
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
