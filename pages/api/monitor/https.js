const request = require("request");

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const url = req.query.url;
        request(url, function (error, response) {
          if (!error) {
            res.status(200).json({ url: url, status: response.statusCode });
          } else {
            res.status(200).json({ url: url, error: error });
          }
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
