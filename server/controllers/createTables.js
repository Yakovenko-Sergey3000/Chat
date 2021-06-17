const knex = require('../configDB');

module.exports.createTables = async () => {
    try{
        let tableUsers =  await knex.schema.hasTable('users');
        let tableFriends=  await knex.schema.hasTable('contacts');
        let tableMess = await knex.schema.hasTable('messages');
        let tableRooms = await knex.schema.hasTable('rooms');
        // let tableUserMessLink  = await knex.schema.hasTable('userMessLink')



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
            case tableMess :
                    await knex.schema
                        .createTable('messages', table => {
                            table.increments('id');


                            table
                                .integer('room_id')
                                .references('rooms.roomId')
                                .notNullable()
                            table
                                .text('mess')
                                .notNullable()
                            // table
                            //     .date('date_created')
                            //     .notNullable()
                            // table
                            //     .boolean('is_read')
                            //     .defaultTo(false)
                        })
                break
            case tableRooms :
                    await knex.schema
                        .createTable('rooms', table => {
                            table.increments('id');
                            table
                                .integer('user_from')

                            table
                                .integer('user_to')
                            table
                                .integer('roomId')
                                .primary()
                            table
                                .string('room_name')

                        })
                break

            // case tableUserMessLink :
            //         await knex.schema
            //             .createTable('userMessLink', table => {
            //                 table.increments('id').primary()
            //                 table
            //                     .integer('user_id')
            //                     .references('users.id')
            //                 table
            //                     .integer('rooms_id')
            //                     .references('rooms.id')
            //                 table
            //                     .string('room_name')
            //                     .references('users.id')
            //                 table
            //                     .text('last_msg')
            //                 table.integer('unread_msg_count');
            //             })
            //     break
        }


    } catch (e) {
        console.log('KNEX(createTables)', e)
    }
}