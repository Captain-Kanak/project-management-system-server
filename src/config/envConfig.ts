import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const envConfig = {
  datebase_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  token_expires_in: process.env.TOKEN_EXPIRES_IN,
};
