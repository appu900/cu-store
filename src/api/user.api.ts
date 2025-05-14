import express, { Request, Response, NextFunction } from "express";
import { UserService } from "../services/auth.service";
import {
  AuthenticatedRequest,
  authenticateUser,
  authorizeAdmin,
  authorizeRole,
} from "../middleware/authentication-middleware";
const router = express.Router();

router.post("/register", register);
router.post("/login", authenticate);
router.get("/users", authenticateUser, authorizeAdmin, getAll);
router.get("/users/:id",getUserByID)

export default router;

function register(req: Request, res: Response, next: NextFunction) {
  UserService.register(req.body)
    .then((user) => {
      console.log("user Registration succesfully");
      res.status(201).json({
        message: "user created sucessfully",
        user,
      });
    })
    .catch((error) => {
      console.log("User creation failed", error);
      next(error);
    });
}

function authenticate(req: Request, res: Response, next: NextFunction) {
  UserService.authenticate(req.body.email, req.body.password)
    .then((user) => {
      console.log("User authentication done");
      user
        ? res.status(200).json({ message: "authetication successfull", user })
        : res.status(401).json({
            message: "incorrect email or password",
          });
    })
    .catch((error) => {
      console.error("Authentication failed for request");
      next(error);
    });
}

// handle getAll users only admin access
function getAll(req: Request, res: Response, next: NextFunction) {
  UserService.getAllUsers()
    .then((users) => {
      res.status(200).json({
        success: true,
        users,
      });
    })
    .catch((error) => {
      next(error);
    });
}

function getUserByID(req: Request, res: Response, next: NextFunction) {
  const userID = req.params.id;
  console.log(userID)
  if (!userID) {
    res.status(400).json({
      error: "Bad Request",
    });
  }
  UserService.getUser(userID)
    .then((user) => {
      res.status(200).json({
        success: true,
        user,
      });
    })
    .catch((error) => {
      next(error);
    });
}
