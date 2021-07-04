const {Router} = require('express');
const router = Router();
const {body, validationResult} = require('express-validator');
const Service = require('../controllers/authController');
const AuthUser = require('../models/Auth');

const authUser = new AuthUser(new Service());
router.post('/registration',
    body('email', 'Некорректный email').normalizeEmail().isEmail().isLength({min:1}),
        body('password', 'Пароль должен быть больше 6 символов').isLength({
            min: 6
        }),
        async (req,res) => {
            const err = validationResult(req)

            try {
                if(!err.isEmpty()) {
                    throw new Error(err.array().map(item => item.msg))
                } else  {
                  const dataUser =  await authUser.createUser(req.body)
                        req.session.user = dataUser;
                        res.cookie('idSess', req.sessionID)
                        res.json({idSess: req.sessionID, user: dataUser})
                }
            } catch (e) {
                res.status(400).json(e.message)
            }


})


router.post('/login', async (req,res) => {

        try{
           const dataUser = await authUser.loginUser(req.body)

            if(dataUser) {
                req.session.user = dataUser;
                res.cookie('idSess', req.sessionID)
                res.json({idSess: req.sessionID, user: dataUser})
            }

        } catch (e) {
            res.status(400).json(e.message)
        }
})



module.exports = router;