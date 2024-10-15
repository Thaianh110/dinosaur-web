const Brand = require('../models/brand')
const asyncHandler= require('express-async-handler')


const createBrand = asyncHandler( async(req,res) => {
    const response = await Brand.create(req.body)
    return res.json({
        success: response ? true: false ,
        createdBrand: response ? response : 'Cannot create new brand'
    })
})
const getAllBrand = asyncHandler(async(req,res) => {
    const response = await Brand.find().select('title _id')
    return res.status(200).json({
        success: response ? true : false ,
        allBrand: response ? response : 'cannot get all brand'
    })
})
const updateBrand = asyncHandler(async(req,res) => {
    const {bid} = req.params
    const {title} = req.body
    if(!title) throw new Error('Missing Inputs')
    // if(!Object.keys(req.body).length === 0) throw new Error('Missing Inputs')
    const response = await Brand.findByIdAndUpdate(bid, req.body ,{new : true}) 
    return res.status(200).json({
        success: response ? true : false ,
        updatedBrand: response ? response : 'cannot update Brand'
    })
})
const deleteBrand = asyncHandler(async(req,res) => {
    const {bid} = req.params
    const response = await Brand.findOneAndDelete(bid) 
    return res.status(200).json({
        success: response ? true : false ,
        deletedBrand: response ? response : 'cannot delete Brand'
    })
})

module.exports = {
    createBrand,
    getAllBrand,
    updateBrand,
    deleteBrand
}