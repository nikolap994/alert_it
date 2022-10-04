//Tmp file - test connection
// Mby use mongoose (cleaner)
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:root@uptime-monitor.1htbulc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("uptime").collection("uptime_collection");
  // perform actions on the collection object
  console.log(collection)
  client.close();
});