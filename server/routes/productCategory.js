const router = require('express').Router()
const ProductCategory = require('../controllers/productCategory')
const {verifyAccessToken ,isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken,isAdmin],ProductCategory.createCategory)
router.get('/',ProductCategory.getAllCategory)

router.put('/:pcid',[verifyAccessToken,isAdmin],ProductCategory.updateCategory)
router.delete('/:pcid',[verifyAccessToken,isAdmin],ProductCategory.deleteCategory)




module.exports = router