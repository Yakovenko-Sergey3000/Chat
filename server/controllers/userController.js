const knex = require('../configDB');

class UserController  {
    async findAllUsers() {
        return (await knex('users').select('id', 'email','nick_name'))
    }

    async addContact(userId, contactId) {

        const contact = await this.findContacts(userId);
        const candidate = contact.find(user => user.id === contactId)

         if(candidate) {
             return
         }
        await knex('contacts').insert({user_id: userId, contact_id: contactId})

        return await this.findContacts(userId)

    }


    async findContacts(id) {
   return (await knex('contacts').select('users.email','users.id', 'nick_name').
       leftJoin('users', 'users.id', 'contacts.contact_id').
           where('contacts.user_id', id))
    }

    async removeContact(userId, contactId) {
     await knex('contacts')
         .select('*')
         .where('user_id', userId)
         .and
         .where('contact_id', contactId)
         .del()

       return await this.findContacts(userId)

    }


    async openRoom(userId, contactId) {

        const rooms = await this.allUserRoomsJoin(userId)
        if (!rooms.length) {
            const privatRoom = await this.addRoomOnTable(userId)
            await this.createRoomReletions(privatRoom, userId, contactId)
            return ( await this.joinPrivatRoomAndUsers(privatRoom[0], userId) )
        }

        const privatRoom = await this.searchPrivatRooms(contactId,rooms)

        if (privatRoom.length) {
            return ( await this.joinPrivatRoomAndUsers(privatRoom[0], userId) )
        } else  {
            const privatRoom = await this.addRoomOnTable(userId)
                       await this.createRoomReletions(privatRoom, userId, contactId)
            return ( await this.joinPrivatRoomAndUsers(privatRoom[0], userId) )
        }
     }

    async joinPrivatRoomAndUsers(room, userId) {
            const user = await knex('users')
                .select(['users.id', 'users.email', 'users.nick_name', 'room_relation.room_id'])
                .leftJoin('room_relation', 'room_relation.user_id', 'users.id')
                .where('room_relation.room_id', room.id)
                .whereNot('users.id', userId)
            return [{...room, users: user}]
    }

     async createRoomReletions(roomId, userId, contactId) {
         await knex('room_relation').insert({room_id: roomId[0].id, user_id: userId})
         if(Array.isArray(contactId)) {
             const newArr = contactId.map(item => {
                return  {
                    room_id: roomId[0].id,
                    user_id: item.id
                 }
             })
                 await knex('room_relation').insert(newArr)
         } else  {
             await knex('room_relation').insert({room_id: roomId[0].id, user_id: contactId})

         }
    }

    async createGroupRoom(userAdmin, arrayUsers) {
        const room = await this.addRoomOnTable(userAdmin, 'group')
            await this.createRoomReletions(room,userAdmin,arrayUsers)
    }

     async searchRoom(contactId, rooms) {
        return (await knex('room_relation').select('*')
             .whereIn('room_id', rooms.map( ({id}) => id) )
             .and
             .where('user_id', contactId))
     }


    async addRoomOnTable(userId, type = 'privat') {
    return ( await knex('rooms').insert({user_id: userId, room_name: 'test', type: type})
           .returning('*'))
    }

    async searchPrivatRooms(contactId, rooms) {
        return (await knex('rooms')
            .select('rooms.id', 'rooms.last_mess', 'rooms.type', 'rooms.room_name')
            .leftJoin('room_relation', 'room_relation.room_id', 'rooms.id')
            .whereIn('room_relation.room_id', rooms.map( ({id}) => id ))
            .where('rooms.type', 'privat')
            .where('room_relation.user_id', contactId ))
    }

    async allUserRoomsJoin(userId) {
        const rooms = await knex('rooms')
            .select('rooms.id', 'rooms.last_mess', 'rooms.type', 'rooms.room_name')
            .leftJoin('room_relation', 'room_relation.room_id', 'rooms.id')
            .where('room_relation.user_id', userId );

        if (!rooms.length) {
            return rooms;
        }

        const users = await knex('users')
            .select(['users.id', 'users.email', 'users.nick_name', 'room_relation.room_id'])
            .leftJoin('room_relation', 'room_relation.user_id', 'users.id')
            .whereIn('room_relation.room_id', rooms.map(({id}) => id) )
            .whereNot('users.id', userId)

        return rooms.map((room) => {
            const {id} = room;
            const roomUsers = users.filter(({room_id}) => room_id == id);

            return {...room, users: roomUsers};
        })


    }
    async allMessRoom(roomId) {
        return (await  knex('messages')
            .select(['messages.*', 'users.nick_name'] )
            .leftJoin('users', 'messages.user_id', 'users.id')
            .where('messages.room_id', roomId))
    }

    async sendMess({roomId, userId, text, created}) {
         await  knex('messages').insert({room_id: roomId, user_id: userId, mess: text, time: created})
        return this.allMessRoom(roomId)
    }

    async addLastMess(text, roomId) {
        await knex('rooms').where('id', roomId).update({last_mess: text})
    }

    async updateSettings(nick_name, sity, userId) {
       return  (await knex('users')
            .where('id', userId)
            .update({
                nick_name,
                sity
            })
            .returning(['id', 'email', 'nick_name', 'sity', 'status']))

    }

}

module.exports = UserController;