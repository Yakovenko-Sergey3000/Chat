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
            await this.adapter.addContact(userId, contactId)
        } catch (e) {

        }
    }

    async findContacts(id) {
      return await this.adapter.findContacts(id)
    }

    async removeContact({userId, contactId}) {

      await this.adapter.removeContact(userId, contactId)
    }


}

module.exports = User;