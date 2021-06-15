const knex = require('../configDB');

module.exports.createTables = async () => {
    try{
        let tableUsers =  await knex.schema.hasTable('users');
        let tableFriends=  await knex.schema.hasTable('contacts');



        switch (false) {
            case tableUsers :
                await knex.schema
                    .createTable('users', table => {
                        table
                            .increments('id')
                            .primary();
                        table
                            .string('password')
                            .notNullable()
                        table
                            .string('email')
                            .unique()
                            .notNullable()
                        table.string('nick_name');
                        table.string('sity');
                        table
                            .boolean('status')
                            .defaultTo(false)
                    })
                break;
            case tableFriends :
                    await knex.schema
                        .createTable('contacts', table => {
                            table.increments('id').primary();
                            table
                                .integer('user_id')
                                .notNullable()
                                .references('users.id')
                            table
                                .integer('contact_id')
                                .notNullable()
                        })
                break
        }


    } catch (e) {
        console.log('KNEX(createTables)', e)
    }
}