/**
 * subprocess_simple.ts
 */

// define command used to create the subprocess
const command = new Deno.Command(Deno.execPath(), {
  args: ["eval", "console.log('hello'); console.error('world')"],
});

// create subprocess and collect output
const { code, stdout, stderr } = await command.output();

console.assert(code === 0);
console.assert("world\n" === new TextDecoder().decode(stderr));
console.log(new TextDecoder().decode(stdout));
