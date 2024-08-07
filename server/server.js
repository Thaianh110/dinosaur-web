const express = require("express");
const dbConnect = require("./config/dbconnect"); 
const routes = require("./routes");
const cookieParser = require('cookie-parser')


const dotenv = require('dotenv')
dotenv.config()


const app = express();
app.use(cookieParser())
const port = process.env.PORT || 8888

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect();
routes(app);

app.listen(port , ()=> {
    console.log('server running in port: ' + port);
})