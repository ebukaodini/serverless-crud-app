import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import password from "../utils/password";
import jwt from "jsonwebtoken";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password: uPassword } = req.body;

      await UserService.getUser(email).then(async (result) => {
        if (
          result &&
          (await password.verify(uPassword, result.password_hash))
        ) {
          const token = jwt.sign(
            {
              user: result.id,
            },
            process.env.AppSecret!,
            { expiresIn: "7d" }
          );

          const { id, firstname, lastname, email, created_at } = result;
          return res.success("Login successful!", {
            token,
            user: { id, firstname, lastname, email, created_at },
          });
        } else {
          res.success("Invalid email / password!", {}, 400);
        }
      });
    } catch (error: any) {
      next(error);
    }
  }
}
