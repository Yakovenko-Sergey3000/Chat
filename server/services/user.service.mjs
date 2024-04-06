import { DB } from "../DBConfig/configDB.mjs";
import bcrypt from "bcrypt";
class UserService {
  constructor() {
    this.db = DB;
  }
  async create({ email, password }) {
    if (await this.db("users").where({ email }).first()) {
      throw new Error(`Пользователь ${email} уже существует`);
    } else {
      const hashPass = await bcrypt.hash(password, 7);

      return await this.db("users")
        .returning("id")
        .insert({ email, password: hashPass });
    }
  }
  async update({ id, data }) {}
  async remove({ id }) {}
  async getById({ id }) {}
  async getAll() {}
}

export default UserService;
