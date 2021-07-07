require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const bodyParse = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const KnexSessionStore = require('connect-session-knex')(session);
const configDB = require('./configDB');
const apiAuth = require('./rourters/apiAuth');
const apiChat = require('./rourters/apiChat');
const apiUpdateUser = require('./rourters/apiUpdateUser');
const path = require('path')

const cors = require('cors')
const addTable = require('./controllers/createTables');

const io = require('socket.io')(server)
const hadlersUser = require('./components/handlersUser')
const hadlersMess = require('./components/handlersMess')




app.use(
    session({
        store: new KnexSessionStore({
            knex: configDB,
            tablename: 'session'
        }),
        secret: 'SeCReT',
        cookie: {
            secure: true,
            expires: 1000 * 60 * 60,
        },
        saveUninitialized: false,
    })
)
io.on('connection', (socket) => {
    console.log('connection' + ' ' + new Date().getHours() + ':' + new Date().getMinutes());
    hadlersUser(io, socket);
    hadlersMess(io, socket);
    

})


let PORT = process.env.PORT || 5000;

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())
app.use('/api/auth', apiAuth);
app.use('/api', apiChat);
app.use('/api', apiUpdateUser)
app.use(express.static(path.join(__dirname , 'public')));

app.get('/createTable', (req,res) => {
    addTable.createTables()
    console.log('create')

})


try {
    // addTable.createTables()
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
} catch (e) {
    console.log(e)
}

