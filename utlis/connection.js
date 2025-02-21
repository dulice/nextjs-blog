import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
let client = null;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

async function connect() {
  if (client) {
    return client;
  }
  await mongoose.connect(MONGODB_URI);
  client = mongoose.connection;
  return client;
}
const db = { connect };
export default db;
