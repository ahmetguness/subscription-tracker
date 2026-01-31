import { config } from "dotenv";

config();
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const PORT_RAW = process.env.PORT;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error("❌ DB_URI is not defined in environment variables");
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: PORT_RAW ? Number(PORT_RAW) : 3000,
  DB_URI
};

if (Number.isNaN(env.PORT)) {
  throw new Error(`❌ PORT must be a number. Got: "${PORT_RAW}"`);
}
