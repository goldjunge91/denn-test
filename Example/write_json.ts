/**
 * write.ts
 * Command: deno run --allow-write write_json.ts
 */

function writeJson(path: string, data: object): string {
  try {
    Deno.writeTextFileSync(path, JSON.stringify(data));

    return "Written to " + path;
  } catch (e) {
    return e.message;
  }
}

// console.log(writeJson("./data.json", { hello: "World" }));
writeJson("./data.json", { hello: "World" });
console.log("./data.json", { hello: "World" });

/**
 * Output: Written to ./data.json
 */
