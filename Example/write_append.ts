/**
 * write.ts
 * Command: deno run --allow-write write_append.ts
 */
await Deno.writeTextFile("./hello.txt", "\nappended this texz.", {
  append: true,
});
console.log("File written to ./hello.txt");

/**
 * Output: File written to ./hello.txt
 */
