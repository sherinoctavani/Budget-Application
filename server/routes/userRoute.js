const router = require ("express").Router()
const UserController = require ("../controllers/userCont")
const authentication = require ("../middlewares/authentication")

router.post ("/register", UserController.register)
router.post ("/login", UserController.login)
router.use (authentication)
router.get ("/transaction", UserController.transaction)

module.exports = router