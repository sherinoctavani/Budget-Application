const { Expense } = require ("../models/index.js")

class ExpenseController {
    
    static async findExpense (req, res, next) {
        try {
            const expenses = await Expense.findAll({
                where : {
                    EUserId : req.dataUser.id
                }
            })
            res.status(200).json(expenses)
        } catch (err) {
            next (err)
        }
    }

    static async addExpense (req, res, next) {
        try {
            let data = {
                description : req.body.description,
                nominal : req.body.nominal,
                date: req.body.date,
                EUserId : req.dataUser.id
            }
            const newExpense = await Expense.create(data)
            res.status(201).json(newExpense)
        } catch(err) {
            next(err)
        }
    }

    static async updateExpense (req, res, next) {
        try {
            let id = +req.params.id
            let data = {
                description : req.body.description,
                nominal : req.body.nominal,
                date: req.body.date
            }
            const updateExpense = await Expense.update(data, { 
                where : {id},
                returning: true
            })
            if (!updateExpense) {
                throw {
                    status : 404,
                    msg : "Expense Not Found"
                }
            } else {
                res.status(200).json(updateExpense[1][0])
            }
        } catch(err) {
            next(err)
        }
    }

    static async removeExpense (req, res, next) {
        try {
            let id = +req.params.id
            const result = await Expense.destroy({
                where: {id}
            })
            if (!result) {
                throw {
                    status : 404,
                    msg : "Expense Not Found"
                }
            } else {
                res.status(200).json({msg : `Expense Success deleted`})
            }
        } catch(err) {
            next(err)
        }
    }

    static async sumExpNom (req, res, next) {
        try {
            const expenseSum = await Expense.sum('nominal')
            res.status(200).json(expenseSum)
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = ExpenseController