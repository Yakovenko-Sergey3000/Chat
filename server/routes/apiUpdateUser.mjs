import { Router } from "express";
import {config} from "dotenv";config();
import User from '../models/User.mjs'
import UserController from '../controllers/userController.mjs'

const router = Router();
const user = new User(new UserController())

import multer from 'multer';

const multerConfig = multer.diskStorage({
   destination: function (req, res, cb)  {
      cb(null, '/src/app/public');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1])
   },
});

const upload = multer({
   storage: multerConfig,
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


export default router;