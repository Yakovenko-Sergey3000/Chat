import { DB } from "../DBConfig/configDB.mjs";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

class UserService {
  constructor() {
    this.db = DB;
  }
  async create({ email, password }) {
    if (await this.db("users").where({ email }).first()) {
      throw new Error(`Пользователь ${email} уже существует`);
    } else {
      const hashPass = await bcrypt.hash(password, 7);
      const timestamp = new Date();

      return await this.db("users").returning("user_id").insert({
        user_id: v4(),
        name: email,
        email,
        password: hashPass,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }
  }

  getUserByUserIds = async ({ userIds }) =>
    await this.db("users").whereIn("user_id", userIds);
  getUserByUserId = async ({ userId }) =>
    await this.db("users").where("user_id", userId);
}

export default UserService;
