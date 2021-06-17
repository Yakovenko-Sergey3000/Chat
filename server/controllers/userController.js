const knex = require('../configDB');

class UserController  {
    async findAllUsers() {
        return await knex('users').select('id', 'email','nick_name')
        // await knex('messages').insert({
        //     user_from: 5,
        //     user_to: 3,
        //     room_id: 121,
        //     mess: 'blabla'
        //
        // })
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
   return await knex('contacts').select('users.email','users.id', 'nick_name').
       leftJoin('users', 'users.id', 'contacts.contact_id').
           where('contacts.user_id', id);
    }

    async removeContact(userId, contactId) {

      const t =   await knex('contacts').select('*').where('user_id', userId).and.where('contact_id', contactId).del()
        console.log(t)
    }
}

module.exports = UserController;