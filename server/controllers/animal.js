const { query } = require('express')
const Animal = require('../models/animal') 
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createAnimal = asyncHandler(async ( req, res) => {
    if(Object.keys(req.body).length === 0 ) throw new Error('Missing inputs')
    if(req.body && req.body.title) {
        req.body.slug = slugify(req.body.title)
    } 
    const newAnimal = await Animal.create(req.body)
    return res.status(200).json({
        success: newAnimal ? true : false,
        createdAnimal: newAnimal ? newAnimal : "Cannot create Animal "
    })
})
const getAnimal = asyncHandler(async ( req, res) => {
    const{ pid } = req.params
    const animal = await Animal.findById(pid)
    return res.status(200).json({
        success: animal ? true : false,
        AnimalData: animal ? animal : "Cannot get Animal "
    })
})
// Filtering , sorting , pagination 
const getAllAnimal = asyncHandler(async ( req, res) => {
    const queries = {...req.query}
    // dung kiểu copy nó sang một bộ nhớ khác kkhong tham chiếu
    // tách các trường đặc biệt 
    const excludeFields= ['limit','sort','page','fields']
    excludeFields.forEach(el => delete queries[el])

    // Format lại các operatators dùng cho mongoose
    let queryString = JSON.stringify(queries)
    queryString =queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)

    

    //viết hàm filltering 
    if(queries?.title) formatedQueries.title = {$regex: queries.title , $options : 'i' }
    let queryCommand = Animal.find(formatedQueries)
    // viết hàm sorting
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)

    }
    // Fields limiting
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }
    // Pagination
    // limit: giới hạn số object lấy ra
    // skip: bỏ qua số object 
    // +2 => 2(number) || +adhdhd => NaN
    
    const page = +req.query.page || 1 
    const limit = +req.query.limit || process.env.LIMIT_Animal
    const skip = (page-1) * limit
    queryCommand.skip(skip).limit(limit)



    //execute
    // số lượng sản phâm thoả mãn đk !== số lượng sản phẩm trả về 1 lần gọi api 
    queryCommand.exec()
        .then(response =>{
            if(!response){
                throw new Error('Cannot get all Animal')
            }
            return Animal.find(formatedQueries).countDocuments()
                .then(counts => {
                    return res.status(200).json({
                        success: true,
                        Animals: response,
                        counts
                    })
                }
                )
        })
        .catch(err => {
            return res.status(200).json({
                success: false,
                message:'Cannot get all Animal',
                error: err.message
            })
        })

        
    

    // Query exec khoông còn sử dụng được callback
    // queryCommand.exec(async (err,response) => {
    //     if( err) throw new Error(err.message)
    //     const counts = await Animal.find(formatedQueries).countDocuments()
    // })
    // return res.status(200).json({
    //     success: response ? true : false,
    //     Animals: response ? response : "Cannot get all Animal ",
    //     counts
    // })
})
const updateAnimal = asyncHandler(async ( req, res) => {
    const{ pid } = req.params
    if(req.body && req.body.title ) req.body.slug = slugify(req.body.title)
    const updateAnimal = await Animal.findByIdAndUpdate(pid,req.body,{new: true})
    return res.status(200).json({
        success: updateAnimal ? true : false,
        updatedData: updateAnimal ? updateAnimal : "Cannot update Animal "
    })
})
const deleteAnimal = asyncHandler(async ( req, res) => {
    const{ pid } = req.params
    const deleteAnimal = await Animal.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deleteAnimal ? true : false,
        deletedData: deleteAnimal ? deleteAnimal : "Cannot delete Animal "
    })
})

// const ratings = asyncHandler(async( req, res) => {
//     const {_id} =req.user 
//     const {star, comment , pid} = req.body 
//     if(!star || !pid) throw new Error('Missing Input')
//     // Trường hợp đã đánh giá rồi
//     const ratingAnimal = await Animal.findById(pid)
//     const alreadyRating = ratingAnimal?.ratings?.find(el => el.postedBy.toString() === _id)
//     console.log(alreadyRating)
//     if(alreadyRating){
//         // cập nhật star cung comment
//         await Animal.updateOne({   
//             ratings :{ $elemMatch : alreadyRating}
//         }, {
//             $set: {'ratings.$.star' :star ,'ratings.$.comment' :comment}
//         },{new: true})
//     }else{
//         // thêm star và comment
//         const response = await Animal.findByIdAndUpdate(pid,{
//             $push: {ratings: {star ,comment ,postedBy: _id}}
//         },{new :true})
//         // console.log(response)
//     }
//     //sum ratings
//     const updatedAnimal = await Animal.findById(pid)
//     const ratingCounts = updatedAnimal.ratings.length

//     const sumRatings= updatedAnimal.ratings.reduce( (sum,el) => sum + +el.star ,0)
//     updatedAnimal.totalRating = Math.round(sumRatings *10 /ratingCounts ) /10
//     await updatedAnimal.save()

//     return res.status(200).json({
//         status: true,
//         updatedAnimal
//     })
// })

const uploadImagesAnimal = asyncHandler(async(req,res) => {
    const {pid} = req.params
    if(!req.files) throw new Error('Missing Input')
    const response = await Animal.findByIdAndUpdate(pid,{$push: {images: { $each: req.files.map(el => el.path)}}},{new :true})
  return res.status(200).json({
    status: response ? true : false,
    updateAnimal: response ? response : 'cannot upload image Animal'
  });
})

module.exports = {
    createAnimal,
    getAnimal,
    getAllAnimal,                                                                                                                                                 
    updateAnimal,
    deleteAnimal,
    uploadImagesAnimal,
}