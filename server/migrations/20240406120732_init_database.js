exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.uuid("user_id").unique().notNullable();
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
    table.uuid("room_id").unique().notNullable();
    table.text("name");
    table.enu("type_room", ["direct", "group"]);
    table.dateTime("created_at");
    table.dateTime("updated_at");
  });

  await knex.schema.createTable("room_messages", (table) => {
    table.increments("id").primary();
    table.text("message");
    table.boolean("read").defaultTo(false);
    table.dateTime("created_at");
    table.dateTime("updated_at");

    table.integer("room_id").references("rooms.id").notNullable();
    table.integer("user_id").references("users.id").notNullable();
  });

  await knex.schema.createTable("user_rooms", (table) => {
    table.integer("user_id").references("users.id");
    table.integer("room_id").references("rooms.id");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("user_contacts");
  await knex.schema.dropTable("room_messages");
  await knex.schema.dropTable("user_rooms");
  await knex.schema.dropTable("rooms");
  await knex.schema.dropTable("users");
};
