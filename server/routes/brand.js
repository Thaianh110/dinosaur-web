const router = require('express').Router()
const Brand = require('../controllers/brand')
const {verifyAccessToken ,isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken,isAdmin],Brand.createBrand)
router.get('/',Brand.getAllBrand)

router.put('/:bid',[verifyAccessToken,isAdmin],Brand.updateBrand)
router.delete('/:bid',[verifyAccessToken,isAdmin],Brand.deleteBrand)




module.exports = router