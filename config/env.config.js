import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  NODE_ENV,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_DIALECT,
  BCRYPT_SALT_ROUND,
  ACCESS_TOKEN_SECRET,
  REFRESS_TOKEN_SECRET,
  JWT_SECRET,
} = process.env;

export const isDev = NODE_ENV ? NODE_ENV === "development" : true;