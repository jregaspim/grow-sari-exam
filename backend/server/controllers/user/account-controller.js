const express = require('express');
const userDb = require("../../models/schema/user-db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateAccessToken} = require("../../middleware/authenticator");

const controller = express.Router();

//this is temporary just for dev purposes normally refresh token will be save on other places like DATABASE
let refreshTokens = [];

/**
 * @description login
 * @method POST/
 */
controller.post('/login',  (req, res) => {
    userDb.findOne(
        {username: req.body.username}
    )
    .then(async user => {
        try {
            if(!user) {
                res.status(401).send({message: "Username or Password is Incorrect"});
            } else {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const authUser = {username: user.username, id: user._id};
                    const accessToken = generateAccessToken(authUser);
                    const refreshToken = jwt.sign(authUser, process.env.REFRESH_TOKEN_SECRET);
                    refreshTokens.push(refreshToken);
                    res.status(200).json({accessToken: accessToken, refreshToken:refreshToken});
                } else {
                    res.status(401).json({message: "Username or Password is Incorrect"});
                }
            }

        } catch (err) {
            res.status(500).json({message: err.message});
        }
    })
})

/**
 * @description logout
 * @method DELETE/
 */
controller.delete('/logout',  (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204)
})

/**
 * @description register user
 * @method POST/
 */
controller.post('/register',  async (req, res) => {
    try {
        const user = new userDb({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            status: false,
        })

        console.log("USER: ", user);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword

        user.save(user)
            .then(data => {
                res.status(201).send({message: "Register Success"});
            })
            .catch(err => {
                res.status(500).send(err);
            })

    }catch (err) {
        res.status(500).send(err);
    }
})


controller.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({username: user.username, id: user._id})
        res.status(200).json({accessToken: accessToken});
    })

})


module.exports = controller;