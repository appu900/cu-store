import express from "express";
import UserEndPoints from "./api/user.api";
import StoreEndPointes from "./api/store.api"
import { errorHandler } from "./middleware/error-middleware";
const app = express();

app.use(express.json());
app.use("/api/auth", UserEndPoints);
app.use("/api/store",StoreEndPointes)

app.use(errorHandler);

export default app;
