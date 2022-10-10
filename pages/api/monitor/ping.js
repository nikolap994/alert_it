const ping = require("ping");

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const url = req.query.url;
				ping.promise.probe(url).then(function (res) {
					res.status(200).json({ alive: res.alive });
				});
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
