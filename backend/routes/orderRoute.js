const { 
    newOrder, 
    getSingleOrder, 
    getMyOrders, 
    getAllOrder, 
    updateOrder, 
    deleteOrder 
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router();

router.route("/order/new")
.post(isAuthenticatedUser,newOrder);
router.route("/orders/me")
.get(isAuthenticatedUser,getMyOrders);
router.route("/order/:id")
.get(isAuthenticatedUser,getSingleOrder)

router.route("/admin/orders")
.get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrder);
router.route("/admin/order/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router;
