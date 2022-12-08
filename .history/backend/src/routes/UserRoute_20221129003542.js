const express = require("express");
const {
  user_Create,
  user_Login,
  user_Logout,
  user_forgotPassword,
  user_resetPassword,
  user_Detail,
  user_updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/registration").post(user_Create);

router.route("/login").post(user_Login);

router.route("/logout").get(user_Logout);

router.route("/password/forgot").post(user_forgotPassword);

router.route("/password/reset/:token").put(user_resetPassword);

router.route("/me/update").put(isAuthenticatedUser, user_updatePassword);

router.route("/me/update/info").put(isAuthenticatedUser, updateProfile);

router.route("/me").get(isAuthenticatedUser, user_Detail);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
