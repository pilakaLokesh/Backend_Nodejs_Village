const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose')
const userRouts = require('./routs/userRouts');
const reportRoutes = require('./routs/reportRouts')
const bodyParser = require('body-parser');
const postRoutes = require("./routs/postRoutes");

const adminRoutes = require('./routs/adminRoutes');




const createDefaultAdmin = require("./utils/createDefaultAdmin");

const app = express()


const PORT = process.env.PORT || 4000;
dotEnv.config()



mongoose.connect(process.env.MONGO_URI)
.then(async ()=>{
    console.log("MongoDB connnected successfully")

    await createDefaultAdmin();
})
.catch((error)=>{console.log(error)})

app.use(bodyParser.json());

app.use('/user',userRouts)
app.use('/userReport',reportRoutes)
app.use("/posts", postRoutes);

app.use("/admin", adminRoutes);


 

app.listen(PORT, ()=>{
    console.log(`Server started and running at ${PORT} `)
})

app.use('/', (req,res)=>{
    res.send("<h1>Hello am lokesh</h1>")
})