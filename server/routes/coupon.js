const router = require('express').Router()
const Coupon = require('../controllers/coupon')
const {verifyAccessToken,isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken,isAdmin],Coupon.createNewCoupon)
router.get('/',Coupon.getAllCoupon)
router.put('/:cid',[verifyAccessToken,isAdmin],Coupon.updateCoupon)
router.delete('/:cid',[verifyAccessToken,isAdmin],Coupon.deleteCoupon)
module.exports = router