const { query } = require("express");
const Product = require("../models/product");
const ProductCategories = require('../models/productCategory')
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const makeSKU = require('uniqid')
const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, category, color } = req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req.files?.images?.map((el) => el.path);
  if (!title || !price || !description || !category || !color)
    throw new Error("Missing inputs");
  req.body.slug = slugify(title);
  if (thumb) req.body.thumb = thumb;
  if (images) req.body.images = images;
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    message: newProduct ? "Tạo thành công" : "Cannot create product ",
  });
});
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid)
    .populate({
      path: "ratings",
      populate: {
        path: "postedBy",
        select: "firstname lastname avatar",
      },
    })
    .populate("category", "title slug");
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product ",
  });
});
// Filtering , sorting , pagination
const getAllProduct = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // dung kiểu copy nó sang một bộ nhớ khác kkhong tham chiếu
  // tách các trường đặc biệt
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operatators dùng cho mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const restQueries = JSON.parse(queryString);

  let formatedQueries = {};
  if (queries?.color) {
    delete restQueries.color;
    const colorQuery = queries.color
      ?.split(",")
      .map((el) => ({ color: { $regex: el, $options: "i" } }));
    formatedQueries = { $or: colorQuery };
  }
  //viết hàm filltering
  if (queries?.title)
    restQueries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category) {
    const categoryslug = queries.category
    const categoryID = await ProductCategories.findOne({slug: categoryslug})
    restQueries.category = categoryID // Category sẽ là ObjectId
  }
 

  let queryObject = {};
  if (queries?.q) {
    delete restQueries.q;
    queryObject = {
      $or: [
        { color: { $regex: queries.q, $options: "i" } },
        { title: { $regex: queries.q, $options: "i" } },
        { brand: { $regex: queries.q, $options: "i" } },
        { category: { $regex: queries.q, $options: 'i' } },
        { price: { $regex: queries.q, $options: 'i' } },
        // { description: { $regex: queries.q, $options: "i" } },
      ],
    };
    //     const colorQuery = queries.color?.split(',').map(el => ({ color: { $regex: el, $options: 'i' } }))
    //     formatedQueries = {$or: colorQuery}
  }

  const qr = { ...formatedQueries, ...restQueries, ...queryObject };
  let queryCommand = Product.find(qr);
  // viết hàm sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  // limit: giới hạn số object lấy ra
  // skip: bỏ qua số object
  // +2 => 2(number) || +adhdhd => NaN

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  queryCommand = queryCommand.populate({
    path: "category", // Tên trường cần populate
    select: "title slug", // Các trường cần lấy từ ProductCategory
  });
  //execute
  // số lượng sản phâm thoả mãn đk !== số lượng sản phẩm trả về 1 lần gọi api
  queryCommand
    .exec()
    .then((response) => {
      if (!response) {
        throw new Error("Cannot get all product");
      }
      return Product.find(qr)
        .countDocuments()
        .then((counts) => {
          return res.status(200).json({
            success: true,
            products: response,
            counts,
          });
        });
    })
    .catch((err) => {
      return res.status(200).json({
        success: false,
        message: "Cannot get all product",
        error: err.message,
      });
    });

  // Query exec khoông còn sử dụng được callback
  // queryCommand.exec(async (err,response) => {
  //     if( err) throw new Error(err.message)
  //     const counts = await Product.find(restQueries).countDocuments()
  // })
  // return res.status(200).json({
  //     success: response ? true : false,
  //     products: response ? response : "Cannot get all product ",
  //     counts
  // })
});
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const files = req?.files;
  if (files.thumb) req.body.thumb = files?.thumb[0]?.path;
  if (files.images) req.body.images = files?.images?.map((el) => el.path);
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updateProduct ? true : false,
    message: updateProduct ? "Cập nhật thành công" : "Cannot update product ",
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deleteProduct ? true : false,
    message: deleteProduct ? "Xoá thành công" : "Cannot delete product ",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid, updatedAt } = req.body;
  if (!star || !pid) throw new Error("Missing Input");
  // Trường hợp đã đánh giá rồi
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  if (alreadyRating) {
    // cập nhật star cung comment
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
          "ratings.$.updatedAt": updatedAt,
        },
      },
      { new: true }
    );
  } else {
    // thêm star và comment
    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id, updatedAt } },
      },
      { new: true }
    );
    // console.log(response)
  }
  //sum ratings
  const updatedProduct = await Product.findById(pid);
  const ratingCounts = updatedProduct.ratings.length;

  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updatedProduct.totalRating =
    Math.round((sumRatings * 10) / ratingCounts) / 10;
  await updatedProduct.save();

  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing Input");
  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { images: { $each: req.files.map((el) => el.path) } } },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updateProduct: response ? response : "cannot upload image product",
  });
});
const addVarriantProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { title, price, color } = req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req?.files?.images?.map((el) => el.path);
  if (!title || !price || !color) throw new Error("Missing inputs");
  const response = await Product.findByIdAndUpdate(pid,{
     $push:
      { varriants: { color, price, title, thumb, images, sku: makeSKU().toUpperCase } } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response ? 'thêm biến thể thành công' : "cannot upload image product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
  addVarriantProduct
};
