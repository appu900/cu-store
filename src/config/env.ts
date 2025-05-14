import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "ahajahjhajhhhaj",
};
