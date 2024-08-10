import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { PrismaClient } from "./generated/client/deno/edge.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const envVars = await config();

/**
 * Initialize.
 */
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${envVars.DATABASE_URL}?pgbouncer=true`,
    },
  },
});

async function handler(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const path = url.pathname;
    let response;

    if (path === "/dinosaur" && request.method === "GET") {
      // Holen Sie sich alle Dinosaurier
      const dinosaurs = await prisma.dinosaur.findMany();
      response = new Response(JSON.stringify(dinosaurs, null, 2), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    } else if (path.startsWith("/dinosaur/") && request.method === "GET") {
      // Holen Sie sich einen Dinosaurier nach ID
      const id = path.split("/")[2];
      const dinosaur = await prisma.dinosaur.findUnique({
        where: { id: Number(id) },
      });
      response = new Response(JSON.stringify(dinosaur, null, 2), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    } else if (path === "/dinosaur" && request.method === "POST") {
      // Einen neuen Dinosaurier erstellen
      const { name, description } = await request.json();
      const dinosaur = await prisma.dinosaur.create({
        data: { name, description },
      });
      response = new Response(JSON.stringify(dinosaur, null, 2), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    } else if (path.startsWith("/dinosaur/") && request.method === "DELETE") {
      // Einen Dinosaurier nach ID löschen
      const id = path.split("/")[2];
      const dinosaur = await prisma.dinosaur.delete({
        where: { id: Number(id) },
      });
      response = new Response(JSON.stringify(dinosaur, null, 2), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    } else {
      response = new Response("Nicht gefunden", { status: 404 });
    }

    return response;
  } catch (error) {
    console.error("Fehler:", error);
    return new Response(JSON.stringify({ error: error.message }, null, 2), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}

serve(handler);
