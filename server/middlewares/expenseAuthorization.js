const { Expense } = require ("../models/index.js")

module.exports = async (req, res, next) => {
    try {
            const expense = await Expense.findOne ({
                where : {
                    id : req.params.id
                }
            })

            if (!expense) {
                throw {
                    status : 401,
                    msg : "Expense Not Found"
                }
            }

            if (expense.EUserId === req.dataUser.id) {
                next()
            }else {
                throw {
                    status : 401,
                    msg : "You are not authorize to access this Expense"
                }
            }
    } catch (error) {
            next (error)
    }
    
}