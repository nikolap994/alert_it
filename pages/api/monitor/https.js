const urlStatusCode = require("url-status-code");

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const url = req.query.url;
				const status = await urlStatusCode(url);
				res.status(200).json({ status });
			} catch (error) {
				res.status(400).json({ success: error });
			}

			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
