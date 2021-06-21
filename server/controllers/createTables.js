const knex = require('../configDB');

module.exports.createTables = async () => {
    try{
        let tableUsers =  await knex.schema.hasTable('users');
        let tableContacts=  await knex.schema.hasTable('contacts');
        let tableMess = await knex.schema.hasTable('messages');
        let tableRooms = await knex.schema.hasTable('rooms');
        let tableRoomRelation  = await knex.schema.hasTable('room_relation')



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
            case tableContacts :
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
            case tableMess :
                    await knex.schema
                        .createTable('messages', table => {

                        })

                break
            case tableRooms :
                    await knex.schema
                        .createTable('rooms', table => {
                            table
                                .increments('id')
                                .primary()
                            table.string('room_name', 20)
                            table
                                .integer('user_id')
                                .notNullable()
                        })
                break

            case tableRoomRelation :
                    await knex.schema
                        .createTable('room_relation', table => {
                            table
                                .integer('user_id')
                                .references('users.id')
                            table
                                .integer('room_id')
                                .references('rooms.id')
                        })
                break
        }


    } catch (e) {
        console.log('KNEX(createTables)', e)
    }
}