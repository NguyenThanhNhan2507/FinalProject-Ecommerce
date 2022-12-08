const express = require("express");
const {
  xemTatCaSanPham,
  taoSanPham,
  xemMotDanhGia,
  xoaDanhGia,
  productsAdmin,
  capNhatSanPham,
  xoaSanPham,
  xemMotSanPham,
  taoDanhGiaSanPham,
} = require("../controller/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(xemTatCaSanPham);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), productsAdmin);

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), taoSanPham);

router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), capNhatSanPham)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), xoaSanPham)
  .get(xemMotSanPham);

router.route("/product/review").post(isAuthenticatedUser, taoDanhGiaSanPham);

router
  .route("/reviews")
  .get(xemMotDanhGia)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), xoaDanhGia);

module.exports = router;
