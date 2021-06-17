const hadlersUser = (io, socket) => {

    socket.on('Test', (data) => {
             console.log(data);
    })

    const userLogin = (id) => {
        console.log(`user login: ${id}`);


    }
    const userExit = (id) => {
        console.log(`user exit: ${id}`);
    }

    const testRoom = (data) => {
        console.log(data)
    }

    socket.on('user:login', userLogin)
    socket.on('user:exit', userExit)
    socket.on('user:testRoom', testRoom)
}

module.exports = hadlersUser;