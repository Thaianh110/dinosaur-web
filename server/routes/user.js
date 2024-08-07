const router = require('express').Router()
const user = require('../controllers/user')
const {verifyAccessToken} = require('../middlewares/verifyToken')

router.post('/register',user.register)
router.post('/login',user.login)
router.get('/getuser', verifyAccessToken ,user.getUser)

module.exports = router