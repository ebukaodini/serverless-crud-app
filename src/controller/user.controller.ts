import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import password from "../utils/password";

export class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstname, lastname, email, password: uPassword } = req.body;

      const result = await UserService.getUser(email);
      if (!result) {
        await UserService.createUser({
          firstname,
          lastname,
          email,
          password_hash: await password.hash(uPassword),
        }).then((result: any) => {
          if (result) {
            return res.success("User created successfully!", {
              user: { id: result.insertId, firstname, lastname, email },
            });
          } else {
            return res.error("User was not created.");
          }
        });
      } else {
        return res.error("User was not created. Email already exists!");
      }
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.getUserByID(req.user).then((result: any) => {
        if (result) {
          const { id, firstname, lastname, email, created_at } = result;
          return res.success("User profile!", {
            id,
            firstname,
            lastname,
            email,
            created_at,
          });
        } else {
          return res.error("User profile does not exist!");
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.deleteUser(req.user).then((result: any) => {
        console.log(result);
        return res.success("User profile deleted!");
      });
    } catch (error) {
      return res.error("User profile was not deleted!");
      // next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstname, lastname } = req.body;

      await UserService.updateUser(req.user, { firstname, lastname }).then(
        async (result: any) => {
          if (result) {
            await UserService.getUserByID(req.user).then((result: any) => {
              const { id, firstname, lastname, email, created_at } = result;
              return res.success("User profile updated!", {
                id,
                firstname,
                lastname,
                email,
                created_at,
              });
            });
          } else {
            return res.error("User profile was not updated!");
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
}
