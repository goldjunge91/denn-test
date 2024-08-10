// Deno.serve((_request: Request) => {
//   return new Response("Hello, world!");
// });
// interface Person {
//   firstName: string;
//   lastName: string;
// }

// function sayHello(p: Person): string {
//   return `Hello, ${p.firstName}!`;
// }

// const ada: Person = {
//   firstName: "Ada",
//   lastName: "Lovelace",
// };

// console.log(sayHello(ada));
// const site = await fetch("https://www.deno.com");

// console.log(await site.text());
// function sayHello(p: Person): string {
//   return `Hello, ${p.firstName}!`;
// }

// const ada: Person = {
//   firstName: "Ada",
//   lastName: "Lovelace",
// };

// console.log(sayHello(ada));
import Person, { sayHello } from "./person.ts";

const ada: Person = {
  lastName: "teller",
  firstName: "wäscher",
};

console.log(sayHello(ada));
