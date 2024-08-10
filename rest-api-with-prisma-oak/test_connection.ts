import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const DIRECT_DATABASE_URL = Deno.env.get("DIRECT_DATABASE_URL");

if (!DIRECT_DATABASE_URL) {
  console.error("DIRECT_DATABASE_URL is not set");
  Deno.exit(1);
}

const client = new Client(DIRECT_DATABASE_URL);

try {
  await client.connect();
  console.log("Connected successfully");
  const result = await client.queryArray("SELECT NOW()");
  console.log("Current time:", result.rows[0][0]);
} catch (err) {
  console.error("Connection failed:", err);
} finally {
  await client.end();
}