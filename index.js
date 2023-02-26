const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const db = require('./src/config/db')

const PORT = process.env.PORT || 5000

const app = express()

db()
//middleware
app.use(express.json())

app.use("/auth", require("./src/routes/userRoutes"))

app.get('/', (req,res) => {
    res.status(200).send('<h1>We in</h1>')
})



app.listen(PORT, () => {
    console.log(`App runnin on port : ${PORT}`);
})