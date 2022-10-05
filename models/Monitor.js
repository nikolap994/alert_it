import mongoose from "mongoose";

const MonitorSchema = new mongoose.Schema(
  {
    /**
     * monitorType: HTTP(s),  TCP Port, Ping
     * url: Website url
     * heartbeat: how often we check
     * retries: how many times we recheck after failure
     * acceptedStatusCodes: allowed status codes, for example 200-299
     */
    name: String,
    url: String,
    heartbeat: Number,
    retries: Number,
    acceptedStatusCodes: String,
    monitorType: String,
    owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Monitor || mongoose.model("Monitor", MonitorSchema);
