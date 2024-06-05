const router = require('express').Router()

const user = require('../controllers/user')
    router.post('/register',user.register)


module.exports = router