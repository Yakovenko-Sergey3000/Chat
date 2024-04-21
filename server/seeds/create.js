const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(async function () {
      const password = await bcrypt.hash("123qwe", 7);
      const timestamp = new Date();

      return knex("users").insert([
        {
          user_id: v4(),
          email: "user@fakeqqqq.com",
          name: "user",
          password,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          user_id: v4(),
          email: "user2@fakeqqqq.com",
          name: "user1",
          password,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          user_id: v4(),
          email: "user3@fakeqqqq.com",
          name: "user2",
          password,
          created_at: timestamp,
          updated_at: timestamp,
        },
      ]);
    });
};
