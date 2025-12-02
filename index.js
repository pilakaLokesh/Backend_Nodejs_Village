const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose')
const userRouts = require('./routs/userRouts');
const reportRoutes = require('./routs/reportRouts')
const bodyParser = require('body-parser');
const postRoutes = require("./routs/postRoutes");

const app = express()


const PORT = 4000;
dotEnv.config()



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connnected successfully")
})
.catch((error)=>{console.log(error)})

app.use(bodyParser.json());

app.use('/user',userRouts)
app.use('/userReport',reportRoutes)
app.use("/posts", postRoutes);


app.listen(PORT, ()=>{
    console.log(`Server started and running at ${PORT} `)
})

app.use('/home', (req,res)=>{
    res.send("<h1>Hello am lokesh</h1>")
})