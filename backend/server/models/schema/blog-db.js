const mongoose = require("mongoose");

const schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author:{
        type: schema.Types.ObjectId,
        ref:"User"
    },
    comments: [
        {
            type: schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
},{timestamps:true});

const BlogDb = mongoose.model('Blog', blogSchema)

module.exports = BlogDb;
