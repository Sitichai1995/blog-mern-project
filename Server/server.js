const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require ("dotenv").config()

const blogRoute = require("./Routes/blogRoute")
const authRoute = require("./Routes/authRoute")


const app = express();

//connect to DB
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: false
}).then(() => {
    console.log('connect to database successfully');
}).catch((error) =>{
    console.log(error)
})

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Route
app.use("/api", authRoute)
app.use("/api", blogRoute)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})