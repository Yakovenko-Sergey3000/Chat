import { Router } from "express";
import { validationResult } from "express-validator";
import { Authenticator } from "../lib/authenticator/index.mjs";
import UserService from "../services/user.service.mjs";
import {RegistrationUserValidateSchema} from "././validation-routes/registration-user.validate-schema.mjs";

const router = Router();
const userService = new UserService();

router
  .post("/registration", RegistrationUserValidateSchema, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.mapped());
    }

    try {
      const [userId] = await userService.create({
        email: req.body.email,
        password: req.body.password,
      });

      req.createSession({ userId });
      res.redirect("/api/auth/current_user");
    } catch (e) {
      res.status(400).json({ error_message: e.message });
    }
  })
  .post(
    "/login",
    Authenticator.authenticateUser({
      successRedirect: "/api/auth/current_user",
      failRedirect: "/api/auth/error_message",
    }),
  )
  .get("/logout", Authenticator.checkUser, (req, res) => {
    req.removeSession();
    res.json({ message: "Success" });
  })
  .get("/error_message", (_, res) =>
    res.json({ error_message: "Неверный email или password" }).status(404),
  )
  .get("/current_user", Authenticator.checkUser, (req, res) =>
    res.json({ user: req.user }).status(200),
  );

export default router;
