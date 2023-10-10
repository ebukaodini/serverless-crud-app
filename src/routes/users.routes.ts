import express from "express";
import { UserController } from "../controller/user.controller";
import { AuthService } from "../services/auth.service";

const router = express.Router();

router.post("/users", UserController.createUser);
router.get(
  "/users/profile",
  AuthService.authenticate,
  UserController.getProfile
);
router.patch(
  "/users/profile",
  AuthService.authenticate,
  UserController.updateProfile
);
router.delete(
  "/users/profile",
  AuthService.authenticate,
  UserController.deleteProfile
);

export default router;
