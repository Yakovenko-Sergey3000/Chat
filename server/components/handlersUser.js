


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






    socket.on('user:login', userLogin)
    socket.on('user:exit', userExit)

}

module.exports = hadlersUser;