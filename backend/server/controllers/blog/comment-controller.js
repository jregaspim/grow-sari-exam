const express = require('express');
const blogDb = require("../../models/schema/blog-db");
const userDb = require("../../models/schema/user-db");
const commentDb = require("../../models/schema/blog-comment-db");
const {getCurrentUser, authenticateToken} = require("../../middleware/authenticator");


const controller = express.Router();

/**
 * @description get all comment by blog id
 * @method GET/
 */
controller.get('/comment/all/:blogId', authenticateToken, async (req, res, next) => {
    try {
        const blogId = req.params.blogId
        const comments = await commentDb.find({blog: blogId});
        res.status(200).send(comments);
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }

})

/**
 * @description get blog by id
 * @method GET/
 */
controller.get('/comment/:id', authenticateToken, async (req, res, next) => {
    try {
        const id = req.params.id
        const comment= await commentDb.findById(id);
        res.status(200).send(comment);
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }

})

/**
 * @description create comment
 * @method POST/
 */
controller.post('/comment/add', authenticateToken, async (req, res, next) => {
    try {
        const commenter = await  userDb.findById(getCurrentUser(req, res, next));
        const blog = await  blogDb.findById(req.body.blogId);

        const comment = new commentDb({
            comment: req.body.comment,
            blog: blog._id,
            author: commenter._id
        })

        //Save Blog Comment Model
        await comment.save(comment)
        .then(comment => {
            //Save User Model With Comment Data
            commenter.comments.push(comment._id)
            commenter.save();

            //Save Blog Model With Comment Data
            blog.comments.push(comment._id)
            blog.save();

            res.status(201).send(comment);
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).send(err);
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }

})

/**
 * @description update comment
 * @method PATCH/
 */
controller.patch('/comment/update/:id',  authenticateToken, async (req, res) => {

    try {
        const id = req.params.id
        const oldCommentData = await commentDb.findById(id);

        if (oldCommentData == null) res.status(204).send("no data found");

        console.log(id)
        oldCommentData.comment = req.body.comment;
        console.log(oldCommentData)

        const options = {new: true}
        const result = await commentDb.findByIdAndUpdate(id, oldCommentData,options);
        console.log(result)
        res.status(200).send(result);

    }catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }
})

/**
 * @description update comment
 * @method PATCH/
 */
controller.patch('/comment/update/:id',  authenticateToken, async (req, res) => {

    try {
        const id = req.params.id
        const oldCommentData = await commentDb.findById(id);

        if (oldCommentData == null) res.status(204).send("no data found");

        oldCommentData.comment = req.body.comment;

        const options = {new: true}
        const result = await commentDb.findByIdAndUpdate(id, oldCommentData,options);
        res.status(200).send(result);

    }catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }
})

module.exports = controller;