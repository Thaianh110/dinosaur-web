const Coupon = require('../models/coupon')
const asynchandler = require('express-async-handler')
const { findByIdAndDelete } = require('../models/productCategory')


const createNewCoupon = asynchandler(async(req,res) =>{
    const {name, discount, expiry} = req.body
    if(!name || !discount) throw new Error('Missing Inputs')
    const response = await Coupon.create({...req.body,
    expiry: Date.now()+ expiry *24*60*60*1000}) 
    res.status(200).json({
        success: response ? true: false ,
        createdCoupon : response ? response : "Cannot create new Coupon"
    })
})

const getAllCoupon = asynchandler(async(req,res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt')
    res.status(200).json({
        success: response ? true: false,
        allCoupon : response ? response : "Cannot get all coupon"

    })
})
const updateCoupon = asynchandler(async(req,res) => {
    const {cid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error("Missing Input")
    if(req.body.expiry) req.body.expiry = Date.now() + req.body.expiry *24*60*60*1000
    const response = await Coupon.findByIdAndUpdate(cid,req.body,{new:true})
    res.status(200).json({
         success: response ? true: false,
        updatedCoupon : response ? response : "Cannot update coupon"
    })
})

const deleteCoupon = asynchandler(async(req,res) =>{
    const {cid} = req.params
    const response = await Coupon.findByIdAndDelete(cid)
    res.status(200).json({
        success: response ? true: false,
        deletedCoupon : response ? response : "Cannot delete coupon"
    })
})

module.exports = {
    createNewCoupon,
    getAllCoupon,
    updateCoupon,
    deleteCoupon
}