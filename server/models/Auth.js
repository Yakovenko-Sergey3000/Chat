const bcrypt = require('bcrypt');
const {v4: uuid4}= require('uuid')

class Auth {
    constructor(servise) {
        this.adapter = servise
    }
   async createUser({email, password}) {
      try {
          const candidate = await this.adapter.findUser('email',email) // (nameColl, params)
          if(candidate.length) {
              throw new Error('Такой пользователь существует')
          }
          const hashPass = await bcrypt.hash(password, 7);
            const nickName = email.split('@')[0]

        return this.adapter.createUser(email, hashPass,nickName)
      } catch (e) {
          throw e
      }
    }

    async loginUser({email, password}) {
      try {
          const candidate = await this.adapter.findUser('email',email) // (nameColl, params)
              if(!candidate.length) {
                  throw new Error('Пользователя не существует')
              }

             if(!await bcrypt.compare(password, candidate[0].password)) {
                 throw new Error('Неверный пароль')
             }

             const dataUser= {
                id: candidate[0].id,
                email: candidate[0].email,
                nickName: candidate[0]['nick_name']
            }

    
            return dataUser

      } catch (e) {
          throw e
      }

    }


    async isAuth(id) {
        const res = await this.adapter.getSess(id);
        const candidate = res[0].sess.user;
        return candidate;
    }
}


module.exports = Auth;