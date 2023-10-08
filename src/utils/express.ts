import express, { NextFunction, Request, Response } from "express";
import ServerlessHttp, { Handler } from "serverless-http";
import cors from "cors";
import * as dotenv from "dotenv";
import logger from "morgan";
import path from "path";
import createHttpError from "http-errors";

export class Express {
  static bootstrap() {
    // create express app
    const app = express();

    // configure the dotenv
    if (process.env.NODE_ENV === "test")
      dotenv.config({
        path: path.resolve(process.cwd(), ".env.test"),
      });
    else dotenv.config();

    // setup middlewares
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());

    // catch 404 and forward to error handler
    app.use(function (_req, res, next) {
      const error = createHttpError(404);
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
  }

  static handleError(app: Express) {
    // // catch 404 and forward to error handler
    // app.use(function (_req, res, next) {
    //   const error = createError(404);
    //   return res.error(error.message, undefined, error.statusCode);
    // });
    // // error handler
    // app.use((err: any, req: Request, res: Response) => {
    //   console.log(err);
    //   return res.error(
    //     err.status === 500 ? "Server Error! Please try again." : err.message,
    //     undefined,
    //     err.status || 500
    //   );
    // });
  }

  static prepareHandler(app: Express) {
    const handler: Handler = ServerlessHttp(app);
    return handler;
  }
}
