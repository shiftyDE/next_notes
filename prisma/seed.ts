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

  // User 1 erstellen und dann Notes mit der bekannten ID verknüpfen
  const testUser = await prisma.user.create({
    data: {
      username: "test",
      password: "test",
    },
  });

  await prisma.note.createMany({
    data: [
      { title: "Erste Note", content: "Meine erste Notiz", userId: testUser.id },
      { title: "Todo", content: "Notes API fertig bauen", userId: testUser.id },
    ],
  });

  // User 2 erstellen und dann Notes mit der bekannten ID verknüpfen
  const annaUser = await prisma.user.create({
    data: {
      username: "anna",
      password: "test",
    },
  });

  await prisma.note.createMany({
    data: [
      { title: "Anna's Note", content: "Hallo von Anna", userId: annaUser.id },
    ],
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