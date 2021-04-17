const router = require ("express").Router()
const userRoute = require ("./userRoute")
const expenseRoute = require ("./expRoute")
const incomeRoute = require ("./incRoute")

router.use ('/users', userRoute)
router.use ('/expenses', expenseRoute)
router.use ('/incomes', incomeRoute)

module.exports = router