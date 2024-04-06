import {DB} from './configDB.mjs';
const createTables = async () => {
  let tableUsers =  await DB.schema.hasTable('users');
  let tableContacts=  await DB.schema.hasTable('contacts');
  let tableMess = await DB.schema.hasTable('messages');
  let tableRooms = await DB.schema.hasTable('rooms');
  let tableRoomRelation  = await DB.schema.hasTable('room_relation')

      try{
      !tableUsers && await DB.schema
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
          table
            .text('url_avatar')
        })

      !tableContacts && await DB.schema
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

        !tableRooms && await DB.schema
          .createTable('rooms', table => {
            table
              .increments('id')
              .primary()
            table.text('room_name')
            table
              .integer('user_id')
              .notNullable()
            table
              .text('last_mess')
            table
              .string('type', 20)
          })

      !tableMess && await DB.schema
        .createTable('messages', table => {
          table.increments('id').primary();
          table
            .integer('room_id')
            .references('rooms.id')
            .notNullable()
          table
            .integer('user_id')
            .references('users.id')
            .notNullable()
          table
            .text('mess')
          table
            .boolean('isRead')
            .defaultTo(false)
          table
            .dateTime('time')
        })



      !tableRoomRelation && await DB.schema
        .createTable('room_relation', table => {
          table
            .integer('user_id')
            .references('users.id')
          table
            .integer('room_id')
            .references('rooms.id')
        })

    } catch (e) {
        console.log('DB(createTables)', e)
    }
}

export default createTables