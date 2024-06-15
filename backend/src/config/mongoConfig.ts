import mongoose from "mongoose";

// Connect to database
async function main() {
  await mongoose.connect(process.env.MONGO_URL!);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error"));
}

export default main;
