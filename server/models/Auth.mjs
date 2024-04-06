import bcrypt from "bcrypt";
class Auth {
  constructor(servise) {
    this.adapter = servise;
  }
  async createUser({ email, password }) {
    const candidate = await this.adapter.findUser("email", email); // (nameColl, params)
    if (candidate.length) {
      throw new Error("Такой пользователь существует");
    }
    try {
      const hashPass = await bcrypt.hash(password, 7);
      const nickName = email.split("@")[0];

      return this.adapter.createUser(email, hashPass, nickName);
    } catch (e) {
      throw e;
    }
  }

  async loginUser({ email, password }) {
    const candidate = await this.adapter.findUser("email", email); // (nameColl, params)
    if (!candidate.length) {
      throw new Error("Пользователя не существует");
    }
    if (!(await bcrypt.compare(password, candidate[0].password))) {
      throw new Error("Неверный пароль");
    }

    try {
      const { id, nick_name, sity, status, url_avatar } = candidate[0];
      return { id, nick_name, email, sity, status, url_avatar };
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async isAuth(id) {
    const res = await this.adapter.getSess(id);
    if (res.length) {
      const candidate = res[0].sess.user;

      return candidate;
    } else {
      return {};
    }
  }
}

export default Auth;
