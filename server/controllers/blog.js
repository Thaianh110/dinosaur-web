const Blog = require('../models/blog')
const asynchandler = require('express-async-handler')
const { findByIdAndDelete } = require('../models/productCategory')
const blog = require('../models/blog')

const createNewBlog = asynchandler(async(req,res) =>{
    const {title, description, category} = req.body
    if(!title || !description || !category) throw new Error('Missing Inputs')
    const response = await Blog.create(req.body) 
    res.status(200).json({
        success: response ? true: false ,
        createdBlog : response ? response : "Cannot create new Blog"
    })
})
const updateBlog = asynchandler(async(req,res) =>{
    const {bid} = req.params
    if(!Object.keys(req.body).length === 0) throw new Error('Missing Inputs')
    const response = await Blog.findByIdAndUpdate(bid,req.body,{new: true}) 
    res.status(200).json({
        success: response ? true: false ,
        updatedBlog : response ? response : "Cannot create update blog"
    })
})
const getAllBlog = asynchandler(async(req,res) =>{
    const response = await Blog.find() 
    res.status(200).json({
        success: response ? true: false ,
        allBlog : response ? response : "Cannot get all blog"
    })
})
const deleteBlog = asynchandler(async(req,res) => {
    const {bid} = req.params 
    const response = await Blog.findByIdAndDelete(bid)
    res.status(200).json({
        success: response ? true : false,
        deletedBlog : response ? response : "Cannot delete blog"
    })
})
// Like , dislike


// khi nguoi dung like 1 bai blog thi 
// check xem người dùng có dislike ko => bỏ dislike
// check xem người dùng có like hay không => thêm like/ bỏ like

const likeBlog = asynchandler(async(req,res) => {
    const {_id} = req.user
    const {bid} = req.params 
    if(!bid ) throw new Error('Missing Inputs')
    const blog = await Blog.findById(bid)
    const checkDislike = blog?.dislikes?.find( el => el.toString() === _id)
    if(checkDislike){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            rs : response
        })
    }
    const checkIsLiked = blog?.likes?.find( el => el.toString() === _id)
    if(checkIsLiked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}},{new : true})
        return res.status(200).json({
            success: response ? true : false,
            rs : response
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new : true})
        return res.status(200).json({
            success: response ? true : false,
            rs : response
        })
    }
})
const dislikeBlog = asynchandler(async(req,res) => {
    const {_id} = req.user
    const {bid} = req.params
    if(!bid ) throw new Error('Missing Inputs')
    const blog = await Blog.findById(bid)
    const checkislike = blog?.likes?.find( el => el.toString() === _id)
    if(checkislike){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            rs : response
        })
    }
    const checkDisLiked = blog?.dislikes?.find( el => el.toString() === _id)
    if(checkDisLiked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}},{new : true})
        return res.status(200).json({
            success: response ? true : false,
            rs : response
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new : true})
        return res.status(200).json({
            success: response ? true : false,
            rs : response
        })
    }
})

const getOneBlog = asynchandler(async(req,res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndUpdate(bid, {$inc :{numberViews: 1}}, {new: true})
        .populate('likes','firstname lastname')
        .populate('dislikes','firstname lastname')
    return res.status(200).json({
        success: blog ? true : false,
        rs: blog 
    })
})
const uploadImagesBlog = asynchandler(async(req,res) => {
    const {bid} = req.params
    if(!req.files) throw new Error('Missing Input')
    const response = await Blog.findByIdAndUpdate(bid,{$push: {images: { $each: req.files.map(el => el.path)}}},{new: true})
    return res.status(200).json({
    status: response ? true : false,
    updateBlog: response ? response : 'cannot upload image blog'
  });
})


module.exports = {
    createNewBlog,
    updateBlog,
    getOneBlog,
    getAllBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    uploadImagesBlog
}