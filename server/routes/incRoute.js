const router = require ("express").Router()
const IncomeController = require ("../controllers/incomeCont")
const authentication = require ("../middlewares/authentication")
const authorization = require ("../middlewares/incomeAuthorization")

router.use (authentication)
router.get ("/", IncomeController.findIncome)
router.get ("/sum", IncomeController.sumIncNom)
router.post ("/", IncomeController.addIncome)
router.put ("/:id", authorization, IncomeController.updateIncome)
router.delete ("/:id", authorization, IncomeController.removeIncome)

module.exports = router