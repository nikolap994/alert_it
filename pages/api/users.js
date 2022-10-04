import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

// POST - CREATE NEW USERS
// EXAMPLE REQUEST
// curl --request POST \
//   --url http://localhost:3000/api/users \
//   --header 'Content-Type: application/json' \
//   --data '{
//  "name": "John Doe",
//  "email": "john@doe.com"
// }'
// EXAMPLE RESPONSE
// {
//   "success": true,
//   "data": {
//     "_id": "6112570b245e401eb895c35d",
//     "name": "John Doe",
//     "email": "john@doe.com",
//     "__v": 0
//   }
// }
// GET - GET ALL USERS
// EXAMPLE REQUEST
// curl --request GET \
//   --url http://localhost:3000/api/users \
//   --header 'Content-Type: application/json'
// EXAMPLE RESPONSE
// {
//   "success": true,
//   "data": [
//     {
//       "_id": "6112570b245e401eb895c35d",
//       "name": "John Doe",
//       "email": "john@doe.com",
//       "__v": 0
//     }
//   ]
// }