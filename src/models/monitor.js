const mongoose = require("mongoose");

const MonitorSchema = new mongoose.Schema(
	{
		enabled: Number,
		name: String,
		url: String,
		heartbeat: Number,
		retries: Number,
		acceptedStatusCodes: String,
		image: String,
		monitorType: String,
		port: Number,
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

module.exports =
	mongoose.models.Monitor || mongoose.model("Monitor", MonitorSchema);
