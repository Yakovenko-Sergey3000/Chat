import { Router } from "express";
import { Authenticator } from "../lib/authenticator/index.mjs";
import UserService from "../services/user.service.mjs";
import { RegistrationUserValidateSchema } from "././validation-routes/index.mjs";
import AuthController from "../controllers/auth.controller.mjs";

const router = Router();
const authController = new AuthController();

router.use((req, _, next) => {
  req.userService = new UserService();

  next();
});

router
  .post(
    "/registration",
    RegistrationUserValidateSchema,
    authController.registration,
  )
  .post(
    "/login",
    Authenticator.authenticateUser({
      successRedirect: "/api/auth/current_user",
      failRedirect: "/api/auth/error_message",
    }),
  )
  .get("/logout", Authenticator.checkUser, authController.logout)
  .get("/error_message", authController.errorMessage)
  .get("/current_user", Authenticator.checkUser, authController.currentUser);

export default router;
