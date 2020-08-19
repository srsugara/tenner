// importing the deno_mongo package from url
import { MongoClient } from "https://deno.land/x/mongo@v0.10.1/mod.ts";

// Create client
const client = new MongoClient();
// Connect to mongodb
client.connectWithUri("mongodb://localhost:27017");

// Specifying the database name
const dbname = "tenner"; 
const db = client.database(dbname);

// Declare the collections here. Here we are using only one collection (i.e friends).
const TestRun = db.collection("testrun");

export {db, TestRun};