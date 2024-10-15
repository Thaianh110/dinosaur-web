const User = require('../models/user');
const createPasswordChangeToken = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');
const makeToken = require('uniqid');
const sendMail = require('../ultils/sendEmail');
const { userInfo } = require('../ultils/contant');

// const register = asyncHandler(async (req, res) => {
//   const { email, firstname, lastname, password } = req.body;

//   if (!email || !password || !firstname || !lastname) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing inputs",
//     });
//   }
//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Error("user has existed");
//   } else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       mes: newUser ? "Register is successful" : "Something is wrong",
//     });
//   }
// });

/* Cach 1 Tạo 1 token sau dó gửi nó qua email sau đó ng dùng nhấp vào liên kết thì sẽ lấy token từ params 
 rồivà truyền đi mang theo với pasword mới lẫn token sau đó mới kiểm tra và xác nhận */

// const register = asyncHandler(async (req, res) => {
//   const { email, firstname, lastname, password, mobile } = req.body;
//   if (!email || !password || !firstname || !lastname || !mobile) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing inputs",
//     });
//   }
//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Error("user has existed");
//   } else {
//     const token = makeToken();
//     res.cookie(
//       "dataregister",
//       { ...req.body, token },
//       {
//         httpOnly: true,
//         maxAge: 15 * 60 * 1000,
//       }
//     );
//     const html = `Click vào link dưới để hoàn tất quá trình đăng ký. Link này sẽ hết hạn sau 15 phút kể từ bây giờ.
//                  <a href = ${process.env.URL_SERVER}/api/user/finalregister/${token}> Click here</a>`;

//     await sendMail({
//       email,
//       html,
//       subject: "hoàn tát đăng ký thông tin DinoSaur World",
//     });
//     return res.status(200).json({
//       success: true,
//       mes: "Please check your email to active account",
//     });
//   }
// });

/* cách 2 là lưu tạm các thông tin vào db */
const register = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, password, mobile } = req.body;
  if (!email || !password || !firstname || !lastname || !mobile) {
    return res.status(400).json({
      success: false,
      message: 'Missing inputs'
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error('user has existed');
  } else {
    const token = makeToken();
    const emailEdit = btoa(email) + '@' + token;
    const newUser = await User.create({
      email: emailEdit,
      firstname,
      lastname,
      password,
      mobile
    });
    if (newUser) {
      const html = `<h2> Mã Đăng ký tài khoản: </h2> <br /> <blockqoute>${token} </blockqoute>`;
      await sendMail({
        email,
        html,
        subject: 'hoàn tát đăng ký thông tin DinoSaur World'
      });
    }
    setTimeout(async () => {
      await User.deleteOne({ email: emailEdit });
    }, [500000]);
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser ? 'Please check your email to active account' : 'Something is was wrong'
    });
  }
});

// final register cho cach 1
// const finalRegister = asyncHandler(async (req, res) => {
//   const cookie = req.cookies;
//   const { token } = req.params;
//   if (!cookie || cookie?.dataregister?.token !== token) {
//     res.clearCookie("dataregister");
//     return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`);
//   }
//   const newUser = await User.create({
//     email: cookie?.dataregister?.email,
//     password: cookie?.dataregister?.password,
//     firstname: cookie?.dataregister?.firstname,
//     lastname: cookie?.dataregister?.lastname,
//     mobile: cookie?.dataregister?.mobile,
//   });
//   res.clearCookie("dataregister");
//   if (newUser) {
//     return res.redirect(`${process.env.URL_CLIENT}/finalregister/success`);
//   } else return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`);
// });

// final register cho cách 2
const finalRegister = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const notActiveEmail = await User.findOne({ email: new RegExp(`${token}$`) });
  if (notActiveEmail) {
    notActiveEmail.email = atob(notActiveEmail?.email?.split('@')[0]);
    notActiveEmail.save();
  }
  return res.json({
    success: notActiveEmail ? true : false,
    mes: notActiveEmail ? 'Đăng ký thành công.' : ' Some thing went wrong'
  });
});

// Refresh token => cấp lại access token
// AccessToken => xác thực và phân quyền người dùng
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: 'Missing loi'
    });
  }
  const response = await User.findOne({ email });
  const checkpass = await bcrypt.compare(password, response.password);
  if (response && checkpass) {
    // tách pass và role khỏi response
    const { password, role, refreshToken, ...userData } = response.toObject();
    // tao access và refresh token
    const accessToken = generateAccessToken(response._id, role);
    const newRefreshToken = generateRefreshToken(response._id);
    // Lưu refresh token vào database
    await User.findByIdAndUpdate(response._id, { newRefreshToken }, { new: true });
    // Lưu refresh token vào cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData
    });
  } else {
    throw new Error('Dang nhap that bai');
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById({ _id })
    .select('-refreshToken -password')
    .populate({
      path: 'cart',
      populate: {
        path: 'product',
        select: 'thumb title price'
      }
    });
  return res.status(200).json({
    success: user ? true : false,
    result: user ? user : 'User not found'
  });
});

const reNewAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies;
  // check có token không
  if (!cookie && !cookie.refreshToken) {
    throw new Error('no refreshtoken in cookies');
  }
  // check token hợp lệ không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken
  });
  return res.status(200).json({
    success: response ? true : false,
    NewAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : 'Refresh not matched'
  });
});
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) throw new Error('no refresh token in cookie');
  //xóa refresh token ở db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: ' ' },
    { new: true }
  );
  //xóa refresh token ở cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true
  });
  return res.status(200).json({
    success: true,
    message: 'Logout success'
  });
});
// client gửi email
// server check email => gửi email kèm link password change token
// client check email => click link
// client gửi api kèm theo token
// check token có giống với token mà server gửi ko
// change password

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error('Not found email');
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  // tao token change
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const html = `Click vào link dưới để thay đổi mật khẩu. Thời hạn của link này là 15 phút. 
    <a href =${process.env.URL_CLIENT}/reset-password/${resetToken}> Click here</a>`;
  const data = {
    email,
    html,
    subject: 'Forgot Password'
  };
  const rs = await sendmail(data);
  return res.status(200).json({
    success: rs.response?.includes('OK') ? true : false,
    mes: rs.response?.includes('OK') ? 'Hãy check mail của bạn' : 'Đã có lỗi, hãy thử lại sao'
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) {
    throw new Error('Missing Input');
  }
  const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $lt: Date.now() }
  });
  if (!user) throw new Error('invalid reset token');
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangeAt = Date.now();
  user.passwordResetExpires = undefined;

  await user.save({ validateBeforeSave: false });
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? 'update password' : 'something was wrong'
  });
});
const getAllUser = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // dung kiểu copy nó sang một bộ nhớ khác kkhong tham chiếu
  // tách các trường đặc biệt
  const excludeFields = ['limit', 'sort', 'page', 'fields'];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operatators dùng cho mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
  const restQueries = JSON.parse(queryString);
  //viết hàm filltering
  if (queries?.firstname) restQueries.title = { $regex: queries.title, $options: 'i' };

  // if (req.query.q) {
  //   query = {$or: [
  //     {name: { $regex: req.query.q.title, $options: 'i' }},
  // {email: { $regex: req.query.q.title, $options: 'i' } }
  //   ]}
  // }
  if (req.query.q) {
    delete restQueries.q;
    restQueries['$or'] = [
      { firstname: { $regex: req.query.q, $options: 'i' } },
      { lastname: { $regex: req.query.q, $options: 'i' } },
      { email: { $regex: req.query.q, $options: 'i' } }
    ];
  }

  let queryCommand = User.find(restQueries);

  // viết hàm sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
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

  //execute
  // số lượng sản phâm thoả mãn đk !== số lượng sản phẩm trả về 1 lần gọi api
  queryCommand
    .exec()
    .then((response) => {
      if (!response) {
        throw new Error('Cannot get all product');
      }
      return User.find(queries)
        .countDocuments()
        .then((counts) => {
          return res.status(200).json({
            success: true,
            users: response,
            counts
          });
        });
    })
    .catch((err) => {
      return res.status(200).json({
        success: false,
        message: 'Cannot get all product',
        error: err.message
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
const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const response = await User.findByIdAndDelete(uid);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? `user with email is ' ${response.email}' deleted` : ' no user deleted'
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { firstname, lastname, email, mobile, avatar } = req.body;
  const data = { firstname, lastname, email, mobile };
  if (req.file) data.avatar = req.file.path;
  if (!_id || Object.keys(req.body).length === 0)
    // thay vì !req.body vì req.body là object nên dùng object.keys() => sẽ trả về mảng các key
    throw new Error(' Missing input');
  const response = await User.findByIdAndUpdate(_id, data, {
    new: true
  }).select('-password -role -refreshtoken');
  return res.status(200).json({
    success: response ? true : false,
    message: response ? 'Cập nhật thành công' : 'Something is wrong'
  });
});
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error(' Missing input');
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true
  }).select('-password -role -refreshtoken');
  return res.status(200).json({
    success: response ? true : false,
    message: response ? 'Cập nhật Thành công' : 'Something is wrong'
  });
});

const updateAddressUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error(' Missing input');
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : 'Something is wrong'
  });
});
const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity = 1, color, price, thumb, title } = req.body;
  if (!pid || !color) throw new Error(' Missing input');
  const user = await User.findById(_id).select('cart');
  const alreadyProduct = user?.cart?.find((el) => el.product.toString() === pid && el.color === color);
  if (alreadyProduct) {
    const response = await User.updateOne(
      { cart: { $elemMatch: alreadyProduct } },
      {
        $inc: { 'cart.$.quantity': quantity },
        $set: {
          'cart.$.price': price,
          'cart.$.thumb': thumb,
          'cart.$.title': title
        }
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response ? 'Thêm vào giỏ hàng thành công' : 'Something is wrong'
    });
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color, price, thumb, title } } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response ? 'Thêm vào giỏ hàng thành công' : 'Something is wrong'
    });
  }
});

const removeProductInCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, color } = req.params;
  const user = await User.findById(_id).select('cart');
  const alreadyProduct = user?.cart?.find(
    (el) => el.product.toString() === pid && el.color === color
  );
  if (!alreadyProduct)
    return res.status(200).json({
      success: false,
      message: 'update your cart'
    });
  const response = await User.findByIdAndUpdate(
    _id,
    { $pull: { cart: { product: pid, color } } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response ? 'xoa thanh cong' : 'Something is wrong'
  });
});

const createUsers = asyncHandler(async (req, res) => {
  const response = await User.create(userInfo);
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : 'Something is wrong'
  });
});

module.exports = {
  register,
  login,
  getUser,
  reNewAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getAllUser,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateAddressUser,
  updateCart,
  finalRegister,
  createUsers,
  removeProductInCart
};
