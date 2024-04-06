const bcrypt = require("bcrypt");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(async function () {
      const password = await bcrypt.hash("123qwe", 7);
      const timestamp = new Date();

      return knex("users").insert([
        {
          email: "user@fakeqqqq.com",
          name: "user",
          password,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          email: "user2@fakeqqqq.com",
          name: "user1",
          password,
          created_at: timestamp,
          updated_at: timestamp,
        },
        {
          email: "user3@fakeqqqq.com",
          name: "user2",
          password,
          created_at: timestamp,
          updated_at: timestamp,
        },
      ]);
    });
};
