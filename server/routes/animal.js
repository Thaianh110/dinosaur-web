const router = require('express').Router()
const Animal = require('../controllers/animal')
const {verifyAccessToken ,isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/createAnimal',[verifyAccessToken,isAdmin],Animal.createAnimal)
router.get('/',Animal.getAllAnimal)
router.put('/uploadimage/:pid', [verifyAccessToken,isAdmin],uploader.array('images',10),Animal.uploadImagesAnimal)
router.put('/:pid', [verifyAccessToken,isAdmin],Animal.updateAnimal)
router.get('/:pid', Animal.getAnimal)
router.delete('/:pid',[verifyAccessToken,isAdmin],Animal.deleteAnimal)


module.exports = router


// CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete
// Create + put -> body (các thông tin được ẩn đi)
// get + delete -> query (các thông tin được hiện ?hfhf&)