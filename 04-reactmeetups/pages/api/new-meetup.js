import { MongoClient } from "mongodb";

const connectionString =
  process.env.MONGODB_ATLAS + "meetups?retryWrites=true&w=majority";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(connectionString);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    res.status(201).json({ message: "Meetup inserted!" });
    client.close();
  }
}

export default handler;
