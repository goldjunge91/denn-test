/**
 * read.ts
 * Command: deno run --allow-read read.ts
 */
const text = await Deno.readTextFile("./people.json");

console.log(text);

/**
 * Output:
 *
 * [
 *   {"id": 1, "name": "John", "age": 23},
 *   {"id": 2, "name": "Sandra", "age": 51},
 *   {"id": 5, "name": "Devika", "age": 11}
 * ]
 */
