var express = require('express');
var morgan = require('morgan');
const cors = require('cors');
const { mongodbConnect } = require("./mongodb.connect");
const routes = require('./routes/v1');
require('dotenv').config();

// initializing app
var app = express();

// show request info
app.use(morgan('tiny'));

// show pretty json
app.set('json spaces', 2);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

mongodbConnect()
    .then(() => console.log("Connected MongoDB successfully!!"))
    .then(() => bootServer())
    .catch((err: Error) => {
        console.error(err);
        process.exit(1);
    })

const bootServer = () => {
    app.use('/v1', routes);

    app.listen(process.env.PORT, () => {
        console.log('server is running!');
    });
};
