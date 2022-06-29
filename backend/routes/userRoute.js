const { createUser } = require("../controllers/userController");

const router = require("express").Router();

router.route("/createuser").post(createUser);

module.exports = router;