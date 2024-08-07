const user = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const {generateAccessToken , generateRefreshToken}= require('../middlewares/jwt')

const register = asyncHandler( async(req,res) =>{
    const {email, firstname,lastname, password, mobile} = req.body 

    if(!email || !password || !firstname || !lastname || !mobile){
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        })
    }
    const User = await user.findOne({email});
    if(User){
        throw new Error('user has existed')
    }else {
        const newUser = await user.create(req.body)
        return res.status(200).json ({
            success: newUser ? true : false,
            mes: newUser ? 'Register is successful' : 'Something is wrong'
        })
    }   
})
// Refresh token => cấp lại access token 
// AccessToken => xác thực và phân quyền người dùng
const login = asyncHandler( async(req,res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            mes:"Missing loi"
        })
    }
    const response = await user.findOne({email})
    const checkpass = await bcrypt.compare(password,response.password)
    if(response && checkpass){
        // tách pass và role khỏi response
        const {password,role ,...userData} = response.toObject()
        // tao access và refresh token
        const accessToken= generateAccessToken(response._id,role)
        const refreshToken = generateRefreshToken(response._id);
        // Lưu refresh token vào database 
        await user.findByIdAndUpdate(response._id, {refreshToken} , {new: true})
        // Lưu refresh token vào cookie 
        res.cookie("refreshToken",refreshToken,{httpOnly : true, maxAge: 7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    }else {
        throw new Error('Dang nhap that bai')
    }
})

const getUser = asyncHandler( async(req,res) =>{
    const {_id} = req.user
    const User = await user.findById({_id});
    return res.status(200).json({
        success: false,
        result: User ? User :'User not found'
    })
})


module.exports ={
    register,
    login,
    getUser,
}