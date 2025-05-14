import express from "express";
import UserEndPoints from "./api/user.api";
import { errorHandler } from "./middleware/error-middleware";
const app = express();

app.use(express.json());
app.use("/api/auth", UserEndPoints);

app.use(errorHandler);

export default app;
