const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    status: String,
    dateAdded: { type: Date, default: Date.now },
    lastRun: Date,
    nextRun: Date,
    cron: String,
    enabled: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Job || mongoose.model("Job", JobSchema);
