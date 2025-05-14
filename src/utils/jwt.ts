import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret) as {sub:string,role:string}
};
