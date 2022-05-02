const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    blogs: [
        {
            type: schema.Types.ObjectId,
            ref:"Blog"
        }
    ],
    comments: [
        {
            type: schema.Types.ObjectId,
            ref:"Comment"
        }
    ]

},{timestamps:true})


const UserDb = mongoose.model('User', userSchema)

module.exports = UserDb;
