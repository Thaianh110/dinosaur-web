const router = require('express').Router()
const Order = require('../controllers/order')
const {verifyAccessToken ,isAdmin} = require('../middlewares/verifyToken')

router.post('/',verifyAccessToken,Order.createOrder)
router.get('/',verifyAccessToken,Order.getOneOrder)
router.get('/allorder',[verifyAccessToken,isAdmin],Order.getAllOrder)

router.put('/status/:oid',[verifyAccessToken,isAdmin],Order.updateStatus)


module.exports = router