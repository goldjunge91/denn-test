// Client
// To make GraphQL client calls in Deno, import the graphql npm module with the esm CDN.
// To learn more about using npm modules in Deno via CDN read here.
// Make GraphQL client calls with the graphql npm module Jump to heading#

import { buildSchema, graphql } from "https://esm.sh/graphql";

const schema = buildSchema(`
type Query {
  hello: String
}
`);

const rootValue = {
  hello: () => {
    return "Hello world!";
  },
};

const response = await graphql({
  schema,
  source: "{ hello }",
  rootValue,
});

console.log(response);
