import WebScalper from "../../src/services/web-scalper";

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST":
			try {
				const url = req.body.url;
				const commands = req.body.commands;

				if (url) {
					const scalper = new WebScalper();
					const path = await scalper.getVisual(url, commands);
					res.status(200).json({ success: true, image: path });
				} else {
					res
						.status(400)
						.json({ success: false, message: "Missing URL param." });
				}
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
