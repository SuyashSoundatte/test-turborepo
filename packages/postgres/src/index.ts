import * as dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool, Client } = pg;

const CLIENT_URL = process.env.POSTGRES_CLIENT;
const POOL_URL = process.env.POSTGRES_POOL;

if (!CLIENT_URL) {
  throw new Error("POSTGRES_CLIENT is not set in the environment");
}

if (!POOL_URL) {
  throw new Error("POOL_URL is not set in the environment");
}

const pool = new Pool({ connectionString: POOL_URL });
const client = new Client({ connectionString: CLIENT_URL })


const ConnectDB = async () => {
  try {
    await pool.connect();
    // console.log("✅ Successfully connected to PostgreSQL");
    // await client.end(); 
  } catch (err) {
    console.error("❌ PostgreSQL Connection Error:", err);
    throw new Error("Failed to connect to PostgreSQL");
  }
};

ConnectDB();

export { pool, client, ConnectDB };