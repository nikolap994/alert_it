const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		description: String,
		commands: String,
		cron: String,
		enabled: Number,
		url: String,
		port: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.models.Job || mongoose.model("Job", JobSchema);
