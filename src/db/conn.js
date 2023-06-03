const mongoose = require("mongoose")
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
    .then(()=>{console.log('connected to Database');})
    .catch((err)=>{console.log(err.message)})
