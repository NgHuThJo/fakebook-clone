import { afterAll, afterEach, beforeAll } from "vitest";
import {
  disconnectMongoServer,
  dropDatabase,
  initializeMongoServer,
} from "./mongo-dev-server.js";

beforeAll(async () => {
  await initializeMongoServer();
});

afterEach(async () => {
  await dropDatabase();
});

afterAll(async () => {
  await disconnectMongoServer();
});
