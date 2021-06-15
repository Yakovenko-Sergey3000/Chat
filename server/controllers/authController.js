const knex = require('../configDB');

class Service {
   async createUser(email,password, nickName) {
       return await knex('users').insert({email, password, nick_name: nickName}).returning(['id', 'email','nick_name','status'])
   }
    async findUser(col, email) {
       return  await knex('users').where(col, email);
    }

    async getSess(id) {
      return  await knex('session').where('sid', id);
   }



}

module.exports = Service;
