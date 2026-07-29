import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Alte Testdaten entfernen
  await prisma.note.deleteMany();
  await prisma.user.deleteMany();

  // User 1 mit Notes
  const testUser = await prisma.user.create({
    data: {
      username: "test",
      password: "test",

      notes: {
        create: [
          {
            title: "Erste Note",
            content: "Meine erste Notiz",
          },
          {
            title: "Todo",
            content: "Notes API fertig bauen",
          },
        ],
      },
    },
  });

  // User 2 mit Note
  const annaUser = await prisma.user.create({
    data: {
      username: "anna",
      password: "test456",

      notes: {
        create: [
          {
            title: "Anna's Note",
            content: "Hallo von Anna",
          },
        ],
      },
    },
  });

  console.log("Seed erfolgreich");
  console.log(testUser);
  console.log(annaUser);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });