class User {
    constructor(DBServise) {
        this.adapter = DBServise
    }

   async findAll() {
        try {
            return await this.adapter.findAllUsers()
        } catch (e) {
            return e
        }

    }

    async addContact(userId, contactId) {
        try {
           return  await this.adapter.addContact(userId, contactId)
        } catch (e) {

        }
    }

    async findContacts(id) {
      return await this.adapter.findContacts(id)
    }

    async removeContact({userId, contactId}) {
     return await this.adapter.removeContact(userId, contactId)
    }


    async openRoom({userId, contactId}) {
        try {
           return  await this.adapter.openRoom(userId, contactId)
        } catch (e) {
            console.log(e)
        }
    }

    async allUserRooms({userId}) {
        try {
           return  await this.adapter.allUserRoomsJoin(userId)
        } catch (e) {
            console.log(e)
        }
    }



}

module.exports = User;