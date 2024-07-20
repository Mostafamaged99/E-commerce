process.on("uncaughtException", () => {
  console.log("Uncaught exception error");
});
import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/moduels/bootstrap.js";
import { AppError } from "./src/utlities/appError.js";
import { globalErrorHandler } from "./src/middleware/globalErrorHandler.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/uploads", express.static("uploads"));
bootstrap(app);
app.use("*", (req, res, next) =>
  next(new AppError(`Route not found ${req.originalUrl}`, 404))
);

app.use(globalErrorHandler);
process.on("unhaandledRejection", (err) => {
  console.log("unhaandled rejection error", err);
});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
