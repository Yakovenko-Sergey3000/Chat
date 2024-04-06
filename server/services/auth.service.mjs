import { DB } from "../DBConfig/configDB.mjs";
import bcrypt from "bcrypt";

class AuthService {
  constructor() {
    this.db = DB;
  }

  authenticateStrategy = async ({ email, password }, done) => {
    const candidate = await this.db("users").where({ email }).first();

    if (!candidate) return done(null);

    if (!(await bcrypt.compare(password, candidate.password))) {
      return done(null);
    }

    delete candidate.password;
    done(candidate);
  };

  serialiseUser = async (userId) => {
    const user = await this.db("users").where({ id: userId }).first();

    if (user) delete user.password;

    return user;
  }
}

export default AuthService;
