const express = require('express');
const blogDb = require("../../models/schema/blog-db");
const userDb = require("../../models/schema/user-db");

const {getCurrentUser, authenticateToken} = require("../../middleware/authenticator");



const controller = express.Router();


/**
 * @description get all blogs
 * @method GET/
 */
controller.get('/blog/all', authenticateToken, async (req, res, next) => {
    try {
        const blogs = await blogDb.find({});
        res.status(200).send(blogs);
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }
})

/**
 * @description get blog by id
 * @method GET/
 */
controller.get('/blog/:id', authenticateToken, async (req, res, next) => {
    try {
        const id = req.params.id
        const blog= await blogDb.findById(id);
        res.status(200).send(blog);
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }

})

/**
 * @description create blog
 * @method POST/
 */
controller.post('/blog/add', authenticateToken, async (req, res, next) => {
    try {

        //Get Current User Data
        const author = await  userDb.findById(getCurrentUser(req, res, next));

        //Create Blog Model
        const blog = new blogDb({
            title: req.body.title,
            snippet: req.body.snippet,
            body: req.body.body,
            author: author._id
        })

        //Save Blog Model
        await blog.save(blog)
        .then(blog => {
            //Save User Model With Blog Data
            author.blogs.push(blog._id)
            author.save();
            res.status(201).send(blog);
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
 * @description update blog
 * @method PATCH/
 */
controller.patch('/blog/update/:id',  authenticateToken, async (req, res) => {

    try {
        const id = req.params.id
        const blogData = await blogDb.findById(id);

        if (blogData == null) res.status(204).send("no data found");

        blogData.title = req.body.title;
        blogData.snippet = req.body.snippet;
        blogData.body = req.body.body;

        const options = {new: true}
        const result = await blogDb.findByIdAndUpdate(id, blogData,options);
        res.status(200).send(result);

    }catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }
})

/**
 * @description delete blog
 * @method DELETE/
 */
controller.delete('/blog/delete/:id',  authenticateToken, async (req, res) => {

    try {
        const id = req.params.id
        const blogData = await blogDb.findById(id);

        if (blogData == null) res.status(204).send("no data found");

        await blogDb.findByIdAndDelete(id);
        res.status(204).send();

    }catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }
})

module.exports = controller;