// deno-postgres is a lightweight PostgreSQL driver for Deno focused on developer experience.
import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client({
  user: "user",
  database: "dbname",
  hostname: "127.0.0.1",
  port: 5432,
  password: "password",
});
await client.connect();
