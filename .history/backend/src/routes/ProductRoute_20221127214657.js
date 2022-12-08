const express = require("express");
const {
  xemMotDanhGia,
  xoaDanhGia,
  product_Admin,
  update_Product,
  xoaSanPham,
  xemMotSanPham,
  taoDanhGiaSanPham,
  create_Product,
  get_Product,
} = require("../controller/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(get_Product);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), product_Admin);

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), create_Product);

router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), update_Product)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), xoaSanPham)
  .get(xemMotSanPham);

router.route("/product/review").post(isAuthenticatedUser, taoDanhGiaSanPham);

router
  .route("/reviews")
  .get(xemMotDanhGia)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), xoaDanhGia);

module.exports = router;
