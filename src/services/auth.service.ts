import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthService {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token == null) return res.error("401 - Unauthorized", undefined, 401);

      jwt.verify(token, process.env.AppSecret!, (error, payload: any) => {
        if (error) {
          console.log(error.message);
          return res.error("403 - Unauthorized", undefined, 403);
        }

        req.user = payload.user;
        next();
      });
    } catch (error) {
      throw error;
    }
  }
}
