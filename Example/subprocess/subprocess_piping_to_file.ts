/**
 * subprocess_piping_to_file.ts
 */

import { mergeReadableStreams } from "jsr:@std/streams@1.0.0-rc.4/merge-readable-streams";

// create the file to attach the process to
const file = await Deno.open("./process_output.txt", {
  read: true,
  write: true,
  create: true,
});

// start the process
const command = new Deno.Command("yes", {
  stdout: "piped",
  stderr: "piped",
});

const process = command.spawn();

// example of combining stdout and stderr while sending to a file
const joined = mergeReadableStreams(process.stdout, process.stderr);

// returns a promise that resolves when the process is killed/closed
joined.pipeTo(file.writable).then(() => console.log("pipe join done"));

// manually stop process "yes" will never end on its own
setTimeout(() => {
  process.kill();
}, 10);
