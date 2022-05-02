const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const connectDb = require('./server/database/connection')
const {checkUser} = require("./server/middleware/authenticator");


const app = express();

dotenv.config({path:'config.env'});
const AUTH_PORT = process.env.AUTH_PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

// database connection
connectDb();

//load controllers
app.use('/', require('./server/controllers/user/account-controller'));


//route
app.get('/', (req, res) => {
    res.send("Auth Server is running....process.env.ACCESS_TOKEN_SECRET")
})

app.listen(AUTH_PORT, () => {
    console.log(`Server is running on http://localhost:${AUTH_PORT}`);
})

module.exports = app