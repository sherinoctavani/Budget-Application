const { User, Income, Expense } = require ("../models/index.js")
const bcrypt = require ("bcryptjs")
const { generateToken, verifyToken } = require ("../helpers/jwt.js")

class UserController {

    static async register (req, res, next) {
        try {
            let data = {
                fullname : req.body.fullname,
                email : req.body.email,
                password : req.body.password
            }
            const newUser = await User.create(data)
            res.status(201).json({
                fullname : newUser.fullname,
                email : newUser.email,
                password : newUser.password
            })
        } catch (err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            let email = req.body.email
            const user = await User.findOne ({where : {email}})
            if (!user) {
                throw {
                    status : 401,
                    msg : "Invalid Account"
                }
            } else  {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = generateToken({id: user.id, email: req.body.email})
                    res.status(200).json({token})
                } else {
                    throw {
                        status : 401,
                        msg : "Invalid e-mail/Password"
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    } 

    static async transaction (req, res, next) {
        try {
            const id = +req.dataUser.id
            const users = await User.findOne({ 
                where: {id},
                include: [{
                  model: Income
                }, {
                  model: Expense
                }]
            })
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = UserController