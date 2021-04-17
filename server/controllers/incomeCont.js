const { Income } = require ("../models/index.js")

class IncomeController {
    
    static async findIncome (req, res, next) {
        try {
            const Incomes = await Income.findAll({
                where : {
                    IUserId : req.dataUser.id
                }
            })
            res.status(200).json(Incomes)
        } catch (err) {
            next (err)
        }
    }

    static async addIncome (req, res, next) {
        try {
            let data = {
                description : req.body.description,
                nominal : req.body.nominal,
                date: req.body.date,
                IUserId : req.dataUser.id
            }
            const newIncome = await Income.create(data)
            res.status(201).json(newIncome)
        } catch(err) {
            next(err)
        }
    }

    static async updateIncome (req, res, next) {
        try {
            let id = +req.params.id
            let data = {
                description : req.body.description,
                nominal : req.body.nominal,
                date: req.body.date
            }
            const updateIncome = await Income.update(data, { 
                where : {id},
                returning: true
            })
            if (!updateIncome) {
                throw {
                    status : 404,
                    msg : "Income Not Found"
                }
            } else {
                res.status(200).json(updateIncome[1][0])
            }
        } catch(err) {
            next(err)
        }
    }

    static async removeIncome (req, res, next) {
        try {
            let id = +req.params.id
            const result = await Income.destroy({
                where: {id}
            })
            if (!result) {
                throw {
                    status : 404,
                    msg : "Income Not Found"
                }
            } else {
                res.status(200).json({msg : `Income Success deleted`})
            }
        } catch(err) {
            next(err)
        }
    }

    static async sumIncNom (req, res, next) {
        try {
            const incomeSum = await Income.sum('nominal')
            res.status(200).json(incomeSum)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = IncomeController