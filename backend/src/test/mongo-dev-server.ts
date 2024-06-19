//// mongoConfigTesting.js
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = await MongoMemoryServer.create();

export async function initializeMongoServer() {
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);

  mongoose.connection.on("error", (e) => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
}

export async function dropDatabase() {
  await mongoose.connection.dropDatabase();
}

export async function disconnectMongoServer() {
  await mongoose.connection.close();
  await mongoServer.stop();
}
