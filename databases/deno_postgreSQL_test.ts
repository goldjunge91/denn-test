// postgresjs is a full-featured Postgres client for Node.js and Deno.

// Connect to Postgres with postgresjs Jump to heading#

import postgres from "https://deno.land/x/postgresjs/mod.js";

const sql = postgres("postgres://username:password@host:port/database");
