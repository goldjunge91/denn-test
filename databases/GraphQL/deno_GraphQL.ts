// GraphQL is an API query language often used to compose disparate data sources into
// client-centric APIs. To set up a GraphQL API, you should first set up a GraphQL server.
// This server exposes your data as a GraphQL API that your client applications can
// query for data.
// Server Jump to heading#
// You can use gql, an universal GraphQL HTTP middleware for Deno, to run a GraphQL API
// server in Deno.

// Run a GraphQL API server with gql Jump to heading#
import { GraphQLHTTP } from "https://deno.land/x/gql/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => `Hello World!`,
  },
};

const schema = makeExecutableSchema({ resolvers, typeDefs });

Deno.serve({ port: 3000 }, async () => {
  const { pathname } = new URL(req.url);

  return pathname === "/graphql"
    ? await GraphQLHTTP<Request>({
        schema,
        graphiql: true,
      })(req)
    : new Response("Not Found", { status: 404 });
});
