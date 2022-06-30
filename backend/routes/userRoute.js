const { registerUser, loginUser } = require("../controllers/userController");

const router = require("express").Router();

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);

module.exports = router;