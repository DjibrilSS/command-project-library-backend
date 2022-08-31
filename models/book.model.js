const mongoose = require("mongoose")

const BookSchema = mongoose.Schema({
    name:String,
    genre:{
        ref:"Genre",
        type: mongoose.Types.ObjectId
    },
    rentedUsers:[{
        ref: "User",
        type: mongoose.Types.ObjectId
    }],
    author: String,
    img: String,
    status:{
        type:Boolean,
        default:false
    }

})

const Book = mongoose.model("Book",BookSchema)

module.exports = Book