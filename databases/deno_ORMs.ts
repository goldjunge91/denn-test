// Object-Relational Mappings (ORM) define your data models as classes that you can
// persist to a database. You can read and write data in your database through instances
// of these classes.
// Deno supports multiple ORMs, including Prisma and DenoDB.
// DenoDB Jump to heading#
// DenoDB is a Deno-specific ORM.
// Connect to DenoDB Jump to heading#

import {
  Database,
  DataTypes,
  Model,
  PostgresConnector,
} from "https://deno.land/x/denodb/mod.ts";

const connection = new PostgresConnector({
  host: "...",
  username: "user",
  password: "password",
  database: "airlines",
});

const db = new Database(connection);
