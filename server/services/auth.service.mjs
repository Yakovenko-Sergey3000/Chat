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
}

export default AuthService;
