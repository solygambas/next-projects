import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const url = process.env.MONGODB_ATLAS + "events?retryWrites=true&w=majority";
  const client = await MongoClient.connect(url);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort) // DESC
    .toArray();
  return documents;
}
