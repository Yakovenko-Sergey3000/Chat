import {validationResult} from "express-validator";

class AuthController {
   registration = async (req, res)  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.mapped());
    }

    try {
      const [userId] = await req.userService.create({
        email: req.body.email,
        password: req.body.password,
      });

      req.createSession({ userId });
      res.redirect("/api/auth/current_user");
    } catch (e) {
      res.status(400).json({ error_message: e.message });
    }
  }
  logout = (req, res) => {
    req.removeSession();
    res.json({ message: "Success" });
  }

  errorMessage = (_, res) => {
    res.json({ error_message: "Неверный email или password" }).status(404)
  }

  currentUser = (req, res) =>  {
    res.json({ user: req.user }).status(200)
  }
}

export default AuthController