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
           return await this.adapter.openRoom(userId, contactId)
        } catch (e) {
            console.log(e)
        }
    }

    async createGroupRoom({userAdmin, arrayUsers}) {
        try {
            await this.adapter.createGroupRoom(userAdmin,arrayUsers)
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

    async findAllMessRoom(roomId) {
        try {
            return await this.adapter.allMessRoom(roomId)
        } catch (e) {
            console.log(e)
        }
    }

    async sendMess(date) {
        try {
            return await this.adapter.sendMess(date)
        } catch (e) {
            console.log(e)
        }
    }

    async addLastMess(text, roomId) {
        try {
            await this.adapter.addLastMess(text, roomId)
        } catch (e) {
            console.log(e)
        }

    }


    async updateSettings({nick_name, sity, userId}) {
        try {
          return await this.adapter.updateSettings(nick_name, sity, userId)

        } catch (e) {
            console.log(e)
        }
    }



}

module.exports = User;