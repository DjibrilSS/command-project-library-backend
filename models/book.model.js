const mongoose = require("mongoose")

const BookSchema = mongoose.Schema({
    name:String,
    genre:{
        ref:"Genre",
        type: mongoose.Types.ObjectId
    },
    RentedUsers:[{
        ref: "User",
        type: mongoose.Types.ObjectId
    }],
    avtor: String

})

const Book = mongoose.model("Book",BookSchema)

module.exports = Book