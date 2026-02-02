import { config } from "dotenv";
config();
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });
const PORT_RAW = process.env.PORT;
const DB_URI = process.env.DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
if (!DB_URI) {
    throw new Error("❌ DB_URI is not defined in environment variables");
}
if (!JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is not defined in environment variables");
}
if (!JWT_EXPIRES_IN) {
    throw new Error("❌ JWT_EXPIRES_IN is not defined in environment variables");
}
export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: PORT_RAW ? Number(PORT_RAW) : 3000,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
};
if (Number.isNaN(env.PORT)) {
    throw new Error(`❌ PORT must be a number. Got: "${PORT_RAW}"`);
}
