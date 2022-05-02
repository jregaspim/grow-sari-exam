const {authenticateToken} = require("../../middleware/authenticator");
const https = require('https')


_EXTERNAL_URL = 'https://api.aakhilv.me/fun/facts'

const callExternalApiForFanFacts = (callback) => {
    https.get(_EXTERNAL_URL, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            return callback(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}


module.exports = {callExternalApiForFanFacts};