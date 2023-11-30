const app = require("./app.js")
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"})

process.on("uncaughtException", (err) =>{
    console.log(err);
    process.exit(1);
});

const http =  require("http")

const server = http.createServer(app); 

const DB = process.env.DBURI

mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then((con) =>{
    console.log("DB connected is successfull")
}).catch((err) =>{
    console.log(err);
})

const port = process.env.PORT || 8000


server.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

process.on("unhandledRejection", (err) =>{
    console.log(err);
    server.close(() =>{
        process.exit(1);
    })
})