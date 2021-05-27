const express=require('express')
const mongoose = require('mongoose')
const app=express()
//create database with server
const MONGO_URI="mongodb+srv://khaoula:khaoula1989@cluster0.g78g4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true },(err)=> {
mongoose.connect(MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true },(err)=> {
  
    err ? console.log(err) : console.log('database is connected')
})
//parse the data
app.use(express.json())
app.use('/persons', require('./Routes/personRoutes'))
const port=5000

app.listen( port, (err)=> {
    err ? console.log(err) : console.log('the server is running on port 5000')
})