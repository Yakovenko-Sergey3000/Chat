const {Router} = require('express');
const router = Router();
const Service = require('../controllers/authController');
const AuthUser = require('../models/Auth');

const User = require('../models/User')
const UserController = require('../controllers/userController')

const user = new User(new UserController())


const authUser = new AuthUser(new Service());

const isLogin = async (req,res,next) => {

    try{

        const dataUser= await authUser.isAuth(req.cookies.idSess)
        if(!dataUser) {
         return
        }
        await res.json(dataUser)
        next()
    } catch (e) {
        res.json(e)
    }
}

router.get('/chat', isLogin, async (req, res) => {
    // res.json('OKI')
})

router.get('/search', async (req, res) => {
     try {
         res.json(await user.findAll())
     } catch (e) {
         console.log(e)
     }

})

router.post('/contacts', async (req, res) => {
    try {
      res.json(await user.findContacts(req.body.userId))

    } catch (e) {
        console.log(e)
    }

})

router.delete('/contacts', async (req, res) => {
    const result = await user.removeContact(req.body)
    res.json(result)
})

router.post('/addContact', async (req, res) => {
    try {
        const {userId, contactId} = req.body;
      const rooms = await user.addContact(userId, contactId);
        res.json(rooms)
    } catch (e) {
        console.log(e)
    }
})

router.post('/openRoom', async (req,res) => {
    const result = await user.openRoom(req.body);
    res.json(result)


})

router.post('/allUserRooms', async (req, res) => {
    const rooms = await user.allUserRooms(req.body)
    res.json(rooms)
})



module.exports = router;