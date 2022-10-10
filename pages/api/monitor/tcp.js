import isPortReachable from "is-port-reachable";

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const url = req.query.url;
				const port = req.query.port;

				const result = await isPortReachable(port, { host: url });
				res.status(200).json({ reachable: result });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
