const mongoose = require("mongoose");

const schema = mongoose.Schema;

const blogCommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    blog: {
        type: schema.Types.ObjectId,
        ref:"Blog"
    },
    author:{
        type: schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true});

const BlogCommentDb = mongoose.model('Comment', blogCommentSchema)

module.exports = BlogCommentDb;
