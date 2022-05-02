const express = require('express');
const userDb = require("../../models/schema/user-db");
const bcrypt = require('bcrypt');
const {authenticateToken, getCurrentUser} = require("../../middleware/authenticator");

const controller = express.Router();

/**
 * @description login
 * @method PATCH/
 */
controller.patch('/user/update/:id',  authenticateToken, async (req, res) => {
    try {
        const id = req.params.id

        const userData = await userDb.findById(id);

        if (userData == null) res.status(204).send("no data found");

        userData.name = req.body.name;
        userData.name = req.body.username;
        userData.name = req.body.email;

        const options = {new: true}
        const result = await userDb.findByIdAndUpdate(id, userData,options);
        res.status(200).json(result);

    }catch (err) {
        console.log(err.message)
        res.status(500).send(err);
    }
})

/**
 * @description user get their own user data
 * @method GET/
 */
controller.get('/user/:id',  authenticateToken, async (req, res, next) => {
    try {
        const id = req.params.id
        const userData = await userDb.findById(id);
        const currentUser = await userDb.findById(getCurrentUser(req, res, next));

        if (userData == null) res.status(204);

        if(userData.username == currentUser.username){
            res.status(200).json(userData);
        } else {
            res.status(401).json({message: "Unauthorized access on this data"});
        }

    }catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message});
    }
})

module.exports = controller;