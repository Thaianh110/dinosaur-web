const router = require('express').Router()
const Product = require('../controllers/product')
const {verifyAccessToken ,isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/createproduct',[verifyAccessToken,isAdmin],uploader.fields([
  {name: 'images',maxCount: 10},
  {name: 'thumb',maxCount: 1},
]),Product.createProduct)
router.get('/',Product.getAllProduct)
router.put('/ratings',verifyAccessToken,Product.ratings)
router.put("/varriant/:pid",[verifyAccessToken, isAdmin],uploader.fields([
  {name: 'images',maxCount: 10},
  {name: 'thumb',maxCount: 1},
]), Product.addVarriantProduct);

router.put('/uploadimage/:pid', [verifyAccessToken,isAdmin],uploader.array('images',10),Product.uploadImagesProduct)
router.put("/:pid",[verifyAccessToken, isAdmin],uploader.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  Product.updateProduct
);
router.get('/:pid', Product.getProduct)
router.delete('/:pid',[verifyAccessToken,isAdmin],Product.deleteProduct)



module.exports = router


// CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete
// Create + put -> body (các thông tin được ẩn đi)
// get + delete -> query (các thông tin được hiện ?hfhf&)