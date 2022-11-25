const router = require('express').Router();

// 引入 controller
const { userRegister, userLogin } = require('../controller/authController')



router.post('/user-login', userLogin)
router.post('/user-register', userRegister)



module.exports = router;