import { config } from "dotenv";

config();
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const PORT_RAW = process.env.PORT;

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",

  PORT: PORT_RAW ? Number(PORT_RAW) : 3000,

  DATABASE_URL: process.env.DATABASE_URL,
};

if (Number.isNaN(env.PORT)) {
  throw new Error(`❌ PORT must be a number. Got: "${PORT_RAW}"`);
}
