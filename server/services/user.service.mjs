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
      const timestamp = new Date()

      return await this.db("users")
        .returning("id")
        .insert({ email, password: hashPass, created_at: timestamp, updated_at: timestamp });
    }
  }
  async update({ id, data }) {}
  async remove({ id }) {}
  async getById({ id }) {}
  async getAll() {}
}

export default UserService;
