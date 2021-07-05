const User = require('../models/User')
const UserController = require('../controllers/userController')

const user = new User(new UserController())

const handlersMess = (io, socket) => {
    const getMessRoom = async (roomId) => {
        const res = await user.findAllMessRoom(roomId)
        socket.emit('setMessRoom', res)
        return res
    }

    const joinRoom = (roomId) => {
        socket.join(roomId)
        console.log(socket.rooms)
    }
    const leaveRoom = (roomId) => {
        socket.leave(roomId)
    }


    const sendMess = async ({text, contactId, roomId, userId, created}) => {
        socket.join(roomId)
        await user.sendMess({roomId, text, userId,created})
        await user.addLastMess(text, roomId)
        const res = await getMessRoom(roomId)

        io.in(roomId).emit('historyMess', res)
        io.in(contactId).emit('test', 'mess')

      
    }




    const removeMessage = async (roomId) => {
        const mess = await user.removeMess(roomId)
        io.in(roomId).emit('historyMess', mess)
    }

    const removeRoom = async (roomId) => {
        const rooms = await user.removeRoom(roomId)
    }


    socket.on('room:getMessRoom', getMessRoom)
    socket.on('user:sendMess', sendMess)
    socket.on('room:Join', joinRoom)
    socket.on('room:Leave', leaveRoom)
    socket.on('room:removeMess', removeMessage)
    socket.on('room:removeRoom', removeRoom)


}

module.exports = handlersMess;