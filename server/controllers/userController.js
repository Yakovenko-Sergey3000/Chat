const knex = require('../configDB');

class UserController  {
    async findAllUsers() {
        return await knex('users').select('id', 'email','nick_name')
    }

    async addContact(userId, contactId) {

        const contact = await this.findContacts(userId);
        const candidate = contact.find(user => user.id === contactId)

         if(candidate) {
             return
         }
        await knex('contacts').insert({user_id: userId, contact_id: contactId})
    }


    async findContacts(id) {
   return await knex('contacts').select('users.email','users.id').
       leftJoin('users', 'users.id', 'contacts.contact_id').
           where('contacts.user_id', id);
    }
}

module.exports = UserController;