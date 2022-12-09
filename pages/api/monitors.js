import database from "../../src/helper/database";
import Monitor from "../../src/models/monitor";

import puppeteer from "puppeteer";

export default async function handler(req, res) {
	const { method } = req;

	await database();

	switch (method) {
		case "GET":
			try {
				const userId = req.query.userId;
				if (userId) {
					const monitors = await Monitor.find({ ownder: userId });
					res.status(200).json({ success: true, data: monitors });
				} else if (req.query.id) {
					const id = req.query.id;
					const monitors = await Monitor.find({ _id: id });
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
				const browser = await puppeteer.launch();
				const page = await browser.newPage();
				await page.goto(req.body.url, { waitUntil: "networkidle2" });
				const body = await page
					.screenshot({ encoding: "base64", fullPage: false })
					.then(response => {
						req.body.image = response;
						return req.body;
					});

				const monitor = await Monitor.create(body);
				res.status(201).json({ success: true, data: monitor });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "PUT":
			try {
				const update = req.body.update;
				const monitorId = req.body.id;

				await Monitor.findOneAndUpdate({ _id: monitorId }, update);

				const updatedMonitor = await Monitor.find({ _id: monitorId });
				res.status(201).json({ success: true, data: updatedMonitor });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "DELETE":
			try {
				const monitorId = req.body.id;
				await Monitor.findOneAndDelete({ _id: monitorId });
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
