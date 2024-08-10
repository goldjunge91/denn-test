import "jsr:@std/dotenv/load";

console.log(Deno.env.get("GREETING")); // "Hello, world."
console.log(Deno.env.get("FIREBASE_API_KEY")); // examplekey123
