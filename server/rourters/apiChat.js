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
    await user.removeContact(req.body)
})

router.post('/addContact', async (req, res) => {
    try {
        const {userId, contactId} = req.body;
        await user.addContact(userId, contactId);
    } catch (e) {
        console.log(e)
    }

})



module.exports = router;