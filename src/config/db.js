const mongoose = require("mongoose")

const db = async() => {

    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to db");
    } catch (error) {
        console.log("An error occured");
    }
}

module.exports = db