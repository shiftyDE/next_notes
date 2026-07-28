import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.user.upsert({
    where: {
      username: "test",
    },
    update: {},
    create: {
      username: "test",
      password: "test",
    },
  });

  await prisma.user.upsert({
    where: {
      username: "anna",
    },
    update: {},
    create: {
      username: "anna",
      password: "test456",
    },
  });

  console.log("Dummy-Daten eingefügt");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
