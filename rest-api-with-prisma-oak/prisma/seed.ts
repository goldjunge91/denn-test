import { Prisma, PrismaClient } from "../generated/client/deno/edge.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";

// Load environment variables
const env = await load();
const DATABASE_URL = env["DATABASE_URL"] || Deno.env.get("DATABASE_URL");
const DIRECT_DATABASE_URL =
  env["DIRECT_DATABASE_URL"] || Deno.env.get("DIRECT_DATABASE_URL");

if (!DATABASE_URL || !DIRECT_DATABASE_URL) {
  throw new Error("DATABASE_URL or DIRECT_DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
      // url: DIRECT_DATABASE_URL,
    },
  },
});

const dinosaurData: Prisma.DinosaurCreateInput[] = [
  {
    name: "Aardonyx",
    description: "An early stage in the evolution of sauropods.",
  },
  {
    name: "Abelisaurus",
    description: "Abel's lizard has been reconstructed from a single skull.",
  },
  {
    name: "Acanthopholis",
    description: "No, it's not a city in Greece.",
  },
  {
    name: "Achillobator",
    description: "A fearsome predator named after the Greek hero Achilles.",
  },
  {
    name: "Aegyptosaurus",
    description: "A sauropod from what is now the Sahara Desert.",
  },
  {
    name: "Afrovenator",
    description: "A theropod that once roamed Northern Africa.",
  },
  {
    name: "Agilisaurus",
    description: "A small, agile dinosaur from the Middle Jurassic.",
  },
  {
    name: "Alamosaurus",
    description: "No, it wasn't named after the Alamo.",
  },
  {
    name: "Albertosaurus",
    description: "A close relative of T. rex, discovered in Alberta, Canada.",
  },
  {
    name: "Allosaurus",
    description: "One of the largest predators of the Jurassic period.",
  },
  {
    name: "Amargasaurus",
    description: "A sauropod with a distinctive double row of spines.",
  },
  {
    name: "Ankylosaurus",
    description: "An armored dinosaur with a clubbed tail.",
  },
  {
    name: "Archaeopteryx",
    description: "The famous 'first bird' that links dinosaurs to birds.",
  },
  {
    name: "Argentinosaurus",
    description: "One of the largest land animals to ever exist.",
  },
  {
    name: "Atrociraptor",
    description: "A fearsome predator with a fittingly scary name.",
  },
  {
    name: "Baryonyx",
    description: "A fish-eating dinosaur with a crocodile-like snout.",
  },
  {
    name: "Becklespinax",
    description: "An early Cretaceous theropod with a mysterious history.",
  },
  {
    name: "Brachiosaurus",
    description: "A giraffe-like sauropod that held its head high.",
  },
  {
    name: "Camarasaurus",
    description: "A common sauropod of the late Jurassic period.",
  },
  {
    name: "Carnotaurus",
    description: "A theropod with distinct horns above its eyes.",
  },
  {
    name: "Ceratosaurus",
    description: "A horned carnivore with a blade-like nasal horn.",
  },
  {
    name: "Coelophysis",
    description:
      "One of the earliest known dinosaurs, a swift and agile predator.",
  },
  {
    name: "Compsognathus",
    description:
      "A small, chicken-sized dinosaur that preyed on insects and small reptiles.",
  },
];

/**
 * Seed the database.
 */

for (const u of dinosaurData) {
  try {
    const existingDinosaur = await prisma.dinosaur.findUnique({
      where: { name: u.name },
    });
    if (!existingDinosaur) {
      const dinosaur = await prisma.dinosaur.create({
        data: u,
      });
      console.log(`Created dinosaur with id: ${dinosaur.id}`);
    } else {
      console.log(`Dinosaur with name ${u.name} already exists, skipping.`);
    }
    // Optionally clear prepared statements after each creation
    await prisma.$disconnect(
      console.log("Disconnected from database after seeding."),
    );
    await prisma.$connect(console.log("Connect to database"));
  } catch (error) {
    console.error("Error creating dinosaur:", error);
  }
}
console.log(`Seeding finished.`);

await prisma.$disconnect(
  console.log("Disconnected from database after all seeds are done."),
);
