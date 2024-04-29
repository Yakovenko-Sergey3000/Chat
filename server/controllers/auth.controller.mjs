import { validationResult } from "express-validator";

class AuthController {
  registration = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped());
    }

    try {
      const [userId] = await req.userService.create({
        email: req.body.email,
        password: req.body.password,
      });

      req.createSession({ userId });
      res.redirect("/api/auth/current_user");
    } catch (e) {
      if (e.code === "email") {
        return res.status(400).json({ email: { msg: e.message } });
      }

      res.status(400).json({ error_message: { msg: e.message } });
    }
  };
  logout = (req, res) => {
    req.removeSession();
    res.json({ message: "Success" });
  };

  errorMessage = (_, res) => {
    res
      .status(404)
      .json({ error_message: { msg: "Неверный email или password" } });
  };

  currentUser = (req, res) => {
    res.json({ user: req.user }).status(200);
  };
}

export default AuthController;
