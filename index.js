const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs')
const config = require('./config')

// create express app
const app = express()

// connect to database
const url = config.mongoUrl
const connect = mongoose.connect(url)

connect.then(dp =>{
    console.log("Connect correctly to server")
}, err => {console.log(err)})

// set template engine
app.set('view engine' , 'ejs')
// serve static files from public folder
app.use(express.static('public'))

// Listen to port 4000
app.listen(4000 , ()=>{
    console.log("App Listening to port 4000")
})

// create routes
app.get('/', (req , res)=>{
    res.render('index')
})

app.get('/about', (req , res)=>{
    res.render('about')
})

app.get('/contact', (req , res)=>{
    res.render('contact')
})

app.get('/post', (req , res)=>{
    res.render('post')
})