const User = require('../models/User')
const UserController = require('../controllers/userController')
const Service = require('../controllers/authController');
const AuthUser = require('../models/Auth');

const user = new User(new UserController())
const authUser = new AuthUser(new Service());

const hadlersUser = (io, socket) => {


    const userLogin = async (id) => {
        socket.join(id)
        console.log(`user login: ${id}`);
        await user.setStatus({
            user_id: id,
            status: true
        })

    }
    const userExit = async (id) => {
        console.log(`user exit: ${id}`);
        await user.setStatus({
            user_id: id,
            status: false
        })
    }

    const updateGroup = async (data) => {
            await user.updateSizeGroup(data)
            socket.emit('updateGroup')
    }

    socket.on('test', data => {
        console.log(data);
    })

    socket.on('disconnect', async () => {
        
       

        if(socket.handshake.headers.cookie) {
            const sess = socket.handshake.headers.cookie.split('=')[1]
            const userSess = await authUser.isAuth(sess)
           
            if(userSess.id) {
                await user.setStatus({
                    user_id: userSess.id,
                    status: false
                })
            }
            
        }
        console.log('DISconnect' + ' ' + new Date().getHours() + ':' + new Date().getMinutes());
    })





    socket.on('user:login', userLogin)
    socket.on('user:exit', userExit)
    socket.on('user:updateGroup', updateGroup)


}

module.exports = hadlersUser;