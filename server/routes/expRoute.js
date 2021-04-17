const router = require ("express").Router()
const ExpenseController = require ("../controllers/ExpenseCont")
const authentication = require ("../middlewares/authentication")
const authorization = require ("../middlewares/expenseAuthorization")

router.use (authentication)
router.get ("/", ExpenseController.findExpense)
router.get ("/sum", ExpenseController.sumExpNom)
router.post ("/", ExpenseController.addExpense)
router.put ("/:id", authorization, ExpenseController.updateExpense)
router.delete ("/:id", authorization, ExpenseController.removeExpense)

module.exports = router