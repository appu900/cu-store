import { verifyToken } from "../utils/jwt";
import { env } from "../config/env";
import { Request, Response, NextFunction, RequestHandler } from "express";


export interface AuthenticatedRequest extends Request {
  userID: string;
  role: string;
}

// authenticate user
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenPayload = req.headers.authorization?.split(" ")[1];
  if (!tokenPayload) {
    res.status(401).json({ message: "Unauthozied access atempt" });
    return;
  }
  try {
    const decodedToken = verifyToken(tokenPayload) as {
      sub: string;
      role: string;
    };
    (req as AuthenticatedRequest).userID = decodedToken.sub;
    (req as AuthenticatedRequest).role = decodedToken.role;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
};

export const authorizeRole = (roles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const role = req.role;
    if (!roles.includes(role)) {
      res.status(403).json({ error: "Forbidden: access denied" });
      return;
    }
    next();
  };
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authRequest = req as AuthenticatedRequest;  
  const givenUserRole = authRequest.role
  if (givenUserRole !== "admin") {
    res.status(403).json({ error: "Forbidden:access denied" });
    return;
  }
  next();
};
