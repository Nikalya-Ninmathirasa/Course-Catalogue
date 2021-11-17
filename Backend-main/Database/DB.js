require("dotenv").config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});

const dbconnection = mongoose.connection

dbconnection.on('connected' , ()=>{console.log('Mongo DB Connection Successful')})
dbconnection.on('error' , ()=>{console.log('Mongo Db Connection Failed')})

module.exports = mongoose