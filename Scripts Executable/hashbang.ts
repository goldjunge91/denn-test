#!/usr/bin/env -S deno run --allow-env
//  chmod +x hashbang.ts

/**
 *  hashbang.ts
 */
const path = Deno.env.get("DENO_INSTALL");
console.log("Deno Install Path:", path);
