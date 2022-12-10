export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				try {
					const url = req.query.url;
					var exec = require("child_process").exec;

					exec(`ping ${url} -n 1`, (error, stdout, stderr) => {
						if (error) {
							console.log(`error: ${error.message}`);
							return;
						}
						if (stderr) {
							console.log(`stderr: ${stderr}`);
							return;
						}

						res.status(200).json({ stdout });
					});
				} catch (error) {
					console.error(error);
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
