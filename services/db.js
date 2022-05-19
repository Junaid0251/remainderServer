//database connection

//import mongoose

const mongoose = require('mongoose')

//connection string

mongoose.connect('mongodb://localhost:27017/ramainderServer',{
    useNewUrlParser:true
})

//creating model

const User = mongoose.model('User',{
    email:String,
    name:String,
    password:String,
    event:[]
})

module.exports={
    User
}