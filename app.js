const express = require("express")

const morgan = require("morgan"); // http request logger for middle for nodejs

const rateLimit = require('express-rate-limit'); // use to limit repeated request to public Apis or endpoint

const helmet = require('helmet'); // helps  secure expressjs app by setting various httP header

const bodyParser = require('body-parser');

const mongosanitize = require('express-mongo-sanitize') // search for any key in object thaT begins with a dollar sign
                                                           // and remove or replace

const xss = require("xss");

const cors = require("cors");

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(mongosanitize());

// app.use(xss())

app.use(cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
}))



app.use(express.json({limit:'10kb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"))
}

const limiter = rateLimit({
    max:    3000,
    windowMs:    60*60*1000,
    message: "Too many request from this IP , please try again in some hours",
});

app.use("/tawk", limiter)



module.exports = app;