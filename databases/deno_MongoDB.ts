// We suggest using npm specifiers to work with the official MongoDB driver on npm.
// You can learn more about how to work with the driver in the official docs.
//  The only difference using this module in the context of Deno will be how
// you import the module using an npm: specifier.
// Import the latest major version of the MongoDB driver
import { MongoClient } from "npm:mongodb@6";

// Configure a MongoDB client
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "myProject";

// Connect to a MongoDB instance
await client.connect();
console.log("Connected successfully to server");

// Get a reference to a collection
const db = client.db(dbName);
const collection = db.collection("documents");

// Execute an insert operation
const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }]);
console.log("Inserted documents =>", insertResult);

// Close the connection
client.close();
