const { PrismaClient } = require("@prisma/client");

async function seed() {
  const prisma = new PrismaClient();
  await prisma.issue.deleteMany();
  await prisma.issue.create({
    data: {
      title: "NextJS 12 Limitations",
      summary:
        "NextJS is great but in certain scenarios, it's capabilities are limited",
      description:
        "NextJS currently still has some limitations. For example, when working with nested layouts, cumbersome, non-efficient solutions must be used in many cases.",
    },
  });
  await prisma.issue.create({
    data: {
      title: "Some other issue",
      summary: "This is a totally different issue!",
      description: "The content here is very different",
    },
  });
}

seed();
