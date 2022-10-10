const mongoose = require("mongoose");

const MonitorSchema = new mongoose.Schema(
	{
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
