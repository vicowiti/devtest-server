const { login, newUser } = require("../controllers/User")

const Router = require("express").Router()


//new user

Router.post("/register", newUser)

//existin user

Router.post("/login", login )

module.exports = Router