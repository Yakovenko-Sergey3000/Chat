import { DB } from "../DBConfig/configDB.mjs";

class Service {
  async createUser(email, password, nickName) {
    return await DB("users")
      .insert({ email, password, nick_name: nickName })
      .returning(["id", "email", "nick_name", "url_avatar", "status", "sity"]);
  }
  async findUser(col, email) {
    return await DB("users").where(col, email).select(["*"]);
  }

  async getSess(id) {
    return await DB("session").where("sid", id);
  }
}

export default Service;
