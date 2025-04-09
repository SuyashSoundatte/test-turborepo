import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in the environment");
}


let isConnected = false;

export const MongoConnectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.error(
      `❌ Error connecting to the MongoDB at ${new Date().toISOString()}:`,
      err
    );
    throw new Error("Failed to connect to the MongoDB");
  }
};


MongoConnectDB();
