exports.up = async function (knex) {
  await knex.schema.table("user_contacts", (table) => {
    table.dropColumn("user_id");

    table.integer("owner_user_id").references("users.id").notNullable;
    table.integer("contact_user_id").references("users.id").notNullable;
  });
};

exports.down = async function (knex) {
  await knex.schema.table("user_contacts", (table) => {
    table.dropColumn("owner_user_id");
    table.dropColumn("contact_user_id");
    table.integer("user_id").references("users.id").notNullable;
  });
};
