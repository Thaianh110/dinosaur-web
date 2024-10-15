const router = require("express").Router();
const user = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require('../config/cloudinary.config');

router.post("/register", user.register);
router.post('/mock', user.createUsers)
router.put("/finalregister/:token", user.finalRegister);
router.post("/login", user.login);
router.get("/current", verifyAccessToken, user.getUser);
router.post("/refreshtoken", user.reNewAccessToken);
router.get("/logout", user.logout);
router.post("/forgotpassword", user.forgotPassword);
router.put("/resetpassword", user.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], user.getAllUser); // khác method nên không cần khác link
router.put("/current", [verifyAccessToken] ,uploader.single('avatar'), user.updateUser);
router.put("/address", [verifyAccessToken], user.updateAddressUser);
router.put("/cart", [verifyAccessToken], user.updateCart);
router.delete("/remove-cart/:pid/:color", [verifyAccessToken], user.removeProductInCart);
router.delete("/:uid", [verifyAccessToken, isAdmin], user.deleteUser);
router.put("/:uid", [verifyAccessToken, isAdmin], user.updateUserByAdmin);

module.exports = router;

// CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete
// Create + put -> body (các thông tin được ẩn đi)
// get + delete -> query (các thông tin được hiện ?hfhf&)
