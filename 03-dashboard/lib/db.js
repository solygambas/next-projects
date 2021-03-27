import { MongoClient } from "mongodb";

const connectionString =
  process.env.MONGODB_ATLAS + "auth?retryWrites=true&w=majority";

export async function connectToDatabase() {
  const client = await MongoClient.connect(connectionString);
  return client;
}
