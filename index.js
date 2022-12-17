const express = require('express')
const path = require('path')

// create express app
const app = express()

// serve static files from public folder
app.use(express.static('public'))

// Listen to port 4000
app.listen(4000 , ()=>{
    console.log("App Listening to port 4000")
})

// create routes
app.get('/', (req , res)=>{
    res.sendFile(path.resolve(__dirname + 'pages/index.html'))
})

app.get('/about', (req , res)=>{
    res.sendFile(path.resolve(__dirname + 'pages/about.html'))
})

app.get('/contact', (req , res)=>{
    res.sendFile(path.resolve(__dirname + 'pages/contact.html'))
})

app.get('/post', (req , res)=>{
    res.sendFile(path.resolve(__dirname + 'pages/post.html'))
})

