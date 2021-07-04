const { Router } = require('express')
const router = Router();
require('dotenv').config()

const User = require('../models/User')
const UserController = require('../controllers/userController')

const user = new User(new UserController())

const multer = require('multer');

const config = multer.diskStorage({
   destination: function (req, res, cb)  {
      cb(null, '/src/app/public');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1])
   },
});

const upload = multer({
   storage: config,
}).single('avatar');


router.post('/settings', upload, async (req, res) => {



   res.redirect('/')
   if(req.file) {
      const nameAvatar = req.file.filename;
      await user.updateSettings({...req.body, url_avatar: nameAvatar})
   } else {
      await user.updateSettings({...req.body})
   }


})


module.exports = router;