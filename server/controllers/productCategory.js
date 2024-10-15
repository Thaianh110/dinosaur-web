const  slugify = require('slugify')
const ProductCategory = require('../models/productCategory')
const asyncHandler= require('express-async-handler')


const createCategory = asyncHandler( async(req,res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if (req.body && req.body.title) {
      req.body.slug = slugify(req.body.title)
    } 
     const response = await ProductCategory.create(req.body)
    return res.json({
        success: response ? true: false ,
        createdCategory: response ? response : 'Cannot create new product-category'
    })
})
const getAllCategory = asyncHandler(async(req,res) => {
    const response = await ProductCategory.find()
    return res.status(200).json({
        success: response ? true : false ,
        prodCategories: response ? response : 'cannot get all product-category'
    })
})
const updateCategory = asyncHandler(async(req,res) => {
    const {pcid} = req.params
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body ,{new : true}) 
    return res.status(200).json({
        success: response ? true : false ,
        updatedCategories: response ? response : 'cannot update product-category'
    })
})
const deleteCategory = asyncHandler(async(req,res) => {
    const {pcid} = req.params
    const response = await ProductCategory.findOneAndDelete(pcid) 
    return res.status(200).json({
        success: response ? true : false ,
        deletedCategories: response ? response : 'cannot delete product-category'
    })
})

module.exports = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
}