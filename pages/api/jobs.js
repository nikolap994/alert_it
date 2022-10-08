import database from "../../src/helper/database";
import Job from "../../src/models/job";

export default async function handler(req, res) {
  const { method } = req;

  await database();

  switch (method) {
    case "GET":
      try {
        const filter = req.query;
        const jobs = await Job.find(filter);
        res.status(200).json({ success: true, data: jobs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const job = await Job.create(req.body);
        res.status(201).json({ success: true, data: job });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const update = req.body.update;
        const jobId = req.body.id;

        await Job.findOneAndUpdate({ _id: jobId }, update);

        const updatedJob = await Job.find({ _id: jobId });
        res.status(201).json({ success: true, data: updatedJob });
        return;
      } catch (error) {
        res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
        const jobId = req.body.id;
        await Job.findOneAndDelete({ _id: jobId });
        res.status(201).json({ success: true });
        return;
      } catch (error) {
        res.status(400).json({ success: false });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
