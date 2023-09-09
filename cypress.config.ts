import { defineConfig } from "cypress";
import prisma from "./app/libs/prismadb";

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    experimentalStudio: true,
    defaultCommandTimeout: 12000,
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        deleteRegisterUser: async () => {
          const user = await prisma.user.delete({
            where: {
              email: "test.register.user@test.com",
            },
          });
          return user;
        },
        seedProject: async () => {
          const user = await prisma.user.findUnique({
            where: {
              email: "test.user@test.com",
            },
          });

          if (!user) {
            return null;
          }

          const project = await prisma.project.create({
            data: {
              title: "Test project",
              description: "Test project seeded for testing",
              userId: user.id,
            },
          });

          return project;
        },
        seedDocument: async () => {
          const user = await prisma.user.findUnique({
            where: {
              email: "test.user@test.com",
            },
          });

          if (!user) {
            return null;
          }

          const project = await prisma.project.create({
            data: {
              title: "Document test project",
              description: "Test project seeded for testing",
              userId: user.id,
            },
          });

          if (!project) { return null }

          const document = await prisma.document.create({
            data: {
              title: 'Test document',
              description: 'Seeded test document',
              userId: user.id,
              projectId: project.id
            }
          })

          return document
        },
        purgeTestData: async () => {
          const user = await prisma.user.findUnique({
            where: {
              email: "test.user@test.com",
            },
          });

          if (!user) {
            return null;
          }

          await prisma.document.deleteMany({
            where: {
              userId: user.id,
            },
          });

          await prisma.project.deleteMany({
            where: {
              userId: user.id,
            },
          });

          return true;
        },
      });
    },
  },
});
