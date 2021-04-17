const { Income } = require ("../models/index.js")

module.exports = async (req, res, next) => {
    try {
            const income = await Income.findOne ({
                where : {
                    id : req.params.id
                }
            })

            if (!income) {
                throw {
                    status : 401,
                    msg : "Income Not Found"
                }
            }

            if (income.IUserId === req.dataUser.id) {
                next()
            } else {
                throw {
                    status : 401,
                    msg : "You are not authorize to access this Income"
                }
            }
    } catch (error) {
            next (error)
    }
    
}