import express, { Request, Response, NextFunction } from "express";
import { StoreService } from "../services/store.service";
import {
  AuthenticatedRequest,
  authenticateUser,
  authorizeAdmin,
} from "../middleware/authentication-middleware";
import { respondWithError, respondWithJSON } from "../utils/response-handler";
import { createStoreDTO } from "../dto/store.dto";
const router = express.Router();

router.post("/register", authenticateUser, authorizeAdmin, registerStore);
router.get("/:storeID", fetchStoreDetails);
router.get("/owner/:userID", fetchStoreByUserID);

export default router;

// handler to register a new store
// only admin can create a new store
function registerStore(req: Request, res: Response, next: NextFunction) {
  const authRequest = req as AuthenticatedRequest;
  const userID = authRequest.userID;
  const parsed = createStoreDTO.safeParse(req.body);
  if (!parsed.success) {
    // respondWithError(res, 400, parsed.error.flatten().fieldErrors);
    res.status(400).json({
      success: false,
      errors: parsed.error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }
  StoreService.createStore(parsed.data, userID)
    .then((store) => {
      respondWithJSON(res, 201, store);
    })
    .catch((error) => {
      next(error);
    });
}

// fetch store details by storeID
// access only made for admin
function fetchStoreDetails(req: Request, res: Response, next: NextFunction) {
  const storeID = req.params.storeID;
  if (!storeID) {
    respondWithError(res, 400, "bad request");
  }
  StoreService.getStoreByID(storeID)
    .then((store) => {
      respondWithJSON(res, 200, store);
    })
    .catch((error) => {
      next(error);
    });
}

function fetchStoreByUserID(req: Request, res: Response, next: NextFunction) {
  const authRequest = req as AuthenticatedRequest;
  const userID = req.params.userID;
  if (!userID) {
    respondWithError(res, 400, "userID is required");
    return;
  }
  StoreService.getStoreDetailsByUserID(userID)
    .then((stores) => {
      respondWithJSON(res, 200, stores);
    })
    .catch((error) => {
      next(error);
    });
}
