class AuthAuthenticator {
  constructor() {
    this.user = null;
    this.serialiseUser = null;
    this.sessionStore = null;
    this.sid = null;
    this.authenticateStrategy = null;
  }

  checkUser = async (req, res, next) => {
    const session = await this.getSession();
    let user = null;

    if (session) {
      user = await this.serialiseUser(session.sess.user.id);
    }

    req.isAuthenticated = () => !!user;
    req.removeSession = () => this.removeSession(res);
    req.user = user;
    next();
  };

  session = function () {
    return async (req, res, next) => {
      const { cookies, sessionStore } = req;
      this.sid = cookies["connect.sid"];
      this.sessionStore = sessionStore;
      req.createSession = this.createSession.bind({}, req, res);

      next();
    };
  };
  async getSession() {
    try {
      return await this.sessionStore
        .knex(this.sessionStore.tablename)
        .where({ sid: this.sid || "" })
        .first();
    } catch (e) {
      throw new Error(e);
    }
  }

  async removeSession(res) {
    try {
      return await this.sessionStore
        .knex("session")
        .where({ sid: this.sid })
        .first()
        .delete();

      res.clearCookie("connect.sid");
    } catch (e) {
      console.error(e);
    }
  }

  createSession(req, res, user) {
    if (!user || !user.userId) {
      throw new Error(
        `The key "userId" is undefined; please create a session like this: createSession({ userId: ... })`,
      );
    }

    req.session.user = { id: user.userId };
    const copyReq = { ...this };
    req.sessionStore.generate(copyReq);

    res.cookie("connect.sid", req.sessionID);
  }

  authenticateUser({ failRedirect, successRedirect }) {
    if (!failRedirect) {
      throw new Error(
        'Please pass the key "failRedirect" as a parameter to the function',
      );
    }

    return async (req, res) => {
      if (!this.authenticateStrategy) {
        throw new Error(
          "Your user was not authenticated. Please add your authentication strategy to the main file of your application",
        );
      }

      if (!req.body.email || !req.body.password) {
        return res.json({
          error_message:
            "Please provide the required parameters: email and password",
        });
      }

      await this.authenticateStrategy(req.body, (user) => {
        if (!user) {
          return res.redirect(failRedirect);
        }

        this.createSession(req, res, { userId: user.id });

        if (successRedirect) {
          return res.redirect(successRedirect);
        }

        res.json({ message: "Success" }).status(200);
      });
    };
  }
}

export default AuthAuthenticator;
