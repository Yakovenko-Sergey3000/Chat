exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("password").notNullable();
    table.string("email").unique().notNullable();
    table.string("name");
    table.string("city");
    table.boolean("status").defaultTo(false);
    table.dateTime("created_at");
    table.dateTime("updated_at");
  });

  await knex.schema.createTable("user_contacts", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("users.id");
  });

  await knex.schema.createTable("rooms", (table) => {
    table.increments("id").primary();
    table.text("name");
    table.enu("type_room", ["direct", "group"]);
    table.dateTime("created_at");
    table.dateTime("updated_at");
  });

  await knex.schema.createTable("messages", (table) => {
    table.increments("id").primary();
    table.integer("room_id").references("rooms.id").notNullable();
    table.integer("user_id").references("users.id").notNullable();
    table.text("message");
    table.boolean("read").defaultTo(false);
    table.dateTime("created_at");
    table.dateTime("updated_at");
  });

  await knex.schema.createTable("room_relation", (table) => {
    table.integer("user_id").references("users.id");
    table.integer("room_id").references("rooms.id");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("contacts");
  await knex.schema.dropTable("messages");
  await knex.schema.dropTable("room_relation");
  await knex.schema.dropTable("rooms");
  await knex.schema.dropTable("users");
};
