const { Router } = require('express')
const router = Router();

const User = require('../models/User')
const UserController = require('../controllers/userController')

const user = new User(new UserController())


router.put('/settings', async (req, res) => {
   const upradeUser =  await user.updateSettings(req.body)
   res.json(upradeUser)
})


module.exports = router;