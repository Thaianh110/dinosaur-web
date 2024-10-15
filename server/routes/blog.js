const router = require('express').Router()
const Blog = require('../controllers/blog')
const {verifyAccessToken,isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/',[verifyAccessToken,isAdmin],Blog.createNewBlog)
router.get('/getall',Blog.getAllBlog)
router.get('/getone/:bid',Blog.getOneBlog)
router.put('/like/:bid',verifyAccessToken,Blog.likeBlog)
router.put('/dislike/:bid',verifyAccessToken,Blog.dislikeBlog)
router.put('/:bid',[verifyAccessToken,isAdmin],Blog.updateBlog)
router.put('/uploadimages/:bid',[verifyAccessToken,isAdmin],uploader.array('images',10),Blog.uploadImagesBlog)
router.delete('/:bid',[verifyAccessToken,isAdmin],Blog.deleteBlog)



module.exports = router