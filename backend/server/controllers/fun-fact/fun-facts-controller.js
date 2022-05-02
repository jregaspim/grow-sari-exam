const express = require('express');
const {authenticateToken} = require("../../middleware/authenticator");
const  apiCallForFanFacts = require('../../services/fun-fact-service/fun-facts-service')

const controller = express.Router();

/**
 * @description randomly get fun facts - (example of call external API)
 * @method GET/
 */
controller.get('/fun/fact',  authenticateToken, async (req, res) => {
    apiCallForFanFacts.callExternalApiForFanFacts(function (response){
        res.write(response);
        res.end();
    });
})


module.exports = controller;