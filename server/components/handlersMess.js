const User = require('../models/User')
const UserController = require('../controllers/userController')

const user = new User(new UserController())

const handlersMess = (io, socket) => {
    const getMessRoom = async (roomId) => {
        const res = await user.findAllMessRoom(roomId)
        socket.emit('setMessRoom', res)
        return res
    }


    const sendMess = async ({text, contactId, roomId, userId, created}) => {
        socket.join(contactId)
        await user.sendMess({roomId, text, userId,created})
        await user.addLastMess(text, roomId)
        const res = await getMessRoom(roomId)
        io.in(contactId).emit('massageInRoom', res);

    }


    socket.on('room:getMessRoom', getMessRoom)
    socket.on('user:sendMess', sendMess)
}

module.exports = handlersMess;