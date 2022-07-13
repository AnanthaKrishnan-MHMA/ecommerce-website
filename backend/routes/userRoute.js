const { registerUser, loginUser, logoutUser,
    setNewPassword, forgotPassword, getAllUser,
    getUserDetails, changeUserPassword, updateUser, getSingleUser, updateUserRole, deleteUser
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = require("express").Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(setNewPassword);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/password/reset").put(isAuthenticatedUser, changeUserPassword);
router.route("/me/update").post(isAuthenticatedUser, updateUser);

module.exports = router;