const User = require('../models/User')
const UserController = require('../controllers/userController')

const user = new User(new UserController())


const hadlersUser = (io, socket) => {

    socket.on('Test', (data) => {
             console.log(data);
    })

    const userLogin = (id) => {
        socket.join(id)
        console.log(socket.rooms)
        console.log(`user login: ${id}`);

    }
    const userExit = (id) => {
        console.log(`user exit: ${id}`);
    }

    const updateGroup = async (data) => {
            const room = await user.updateSizeGroup(data)
    }





    socket.on('user:login', userLogin)
    socket.on('user:exit', userExit)
    socket.on('user:updateGroup', updateGroup)


}

module.exports = hadlersUser;