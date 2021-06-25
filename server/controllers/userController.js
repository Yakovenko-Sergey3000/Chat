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
        const rooms = await this.allUserRooms(userId);
        if(!rooms.length){
           const roomId = await this.addRoomOnTable(userId, contactId)
               await this.createRoomReletions(roomId, userId, contactId)
            return  {user_id: contactId, room_id: roomId[0]}
        }

        const arrRooms = []
            rooms.forEach(item => {
                arrRooms.push(item.room_id)
            })

      const room = await this.searchRoom(contactId, arrRooms)
        if(room.length) {
            return await room[0]
        } else {
            const room = await this.addRoomOnTable(userId, contactId)
                   await this.createRoomReletions(room, userId, contactId)

            return {user_id: contactId, room_id: room[0]}
        }

     }

     async createRoomReletions(roomId, userId, contactId) {
         await knex('room_relation').insert({room_id: roomId[0], user_id: userId})
         await knex('room_relation').insert({room_id: roomId[0], user_id: contactId})
    }

     async searchRoom(contactId, rooms) {
        return (await knex('room_relation').select('*')
             .whereIn('room_id', rooms)
             .and
             .where('user_id', contactId))
     }


    async addRoomOnTable(userId) {
    return ( await knex('rooms').insert({user_id: userId, room_name: 'test'})
           .returning('id'))

    }

    async allUserRooms(id) {
        return (await  knex('room_relation').select('room_id')
            .where('user_id', id))
    }

    async allUserRoomsJoin(id) {
        const rooms = await this.allUserRooms(id);
        const arrRooms = []
            rooms.forEach(item => {
                arrRooms.push(item.room_id)
            })
        const users = await knex('room_relation').select(['users.id', 'users.email', 'users.nick_name', 'room_relation.room_id', 'rooms.last_mess'])
            .leftJoin('users', 'room_relation.user_id', 'users.id')
            .leftJoin('rooms', 'room_relation.room_id', 'rooms.id')
            .whereIn('room_id', arrRooms )
        return users.filter(item => item.id !== id)


    }
    async allMessRoom(roomId) {
        return (await  knex('messages').select('*').where('room_id', roomId))
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