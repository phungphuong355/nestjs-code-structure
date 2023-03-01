import { MongoClient } from "mongodb";

export async function cleanUpDb() {
  const client = new MongoClient("mongodb://localhost/27017");

  await client.connect();

  const db = client.db("test");

  return db.dropDatabase();
}
