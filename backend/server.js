const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const connectDb = require('./server/database/connection')
const {checkUser} = require("./server/middleware/authenticator");


const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// database connection
connectDb();

//load controllers
app.use('/', require('./server/controllers/user/user-controller'));
app.use('/', require('./server/controllers/blog/blog-controller'));
app.use('/', require('./server/controllers/blog/comment-controller'));
app.use('/', require('./server/controllers/fun-fact/fun-facts-controller'));


//route
app.get('/', (req, res) => {
    res.send("Crud Application")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

module.exports = app