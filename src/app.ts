import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import ServerlessHttp, { Handler } from "serverless-http";
import createError from "http-errors";
import cors from "cors";
import path from "path";
import * as dotenv from "dotenv";
import { response } from "./utils/response";
import { DatabaseService } from "./services/database.service";

// configure the dotenv
if (process.env.NODE_ENV === "test")
  dotenv.config({
    path: path.resolve(process.cwd(), ".env.test"),
  });
else dotenv.config();

// create express app
const app = express();

// connect to database
DatabaseService.connect();

// use other middlewares
app.use(response);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.get("/", (req, res, next) => {
  return res.success("Welcome!");
});

// catch 404 and forward to error handler
app.use(function (_req, res, next) {
  const error = createError(404);
  return res.error(error.message, undefined, error.statusCode);
});

// error handler
app.use((err: any, req: Request, res: Response) => {
  console.log(err);

  return res.error(
    err.status === 500 ? "Server Error! Please try again." : err.message,
    undefined,
    err.status || 500
  );
});

export const handler: Handler = ServerlessHttp(app);
export default app;
