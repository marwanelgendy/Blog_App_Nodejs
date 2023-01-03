const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const config = require('./config')
const validateForm = require('./middleware/validateForm')

// Controllers Function
const newPostController = require('./controller/newPost')
const homeController = require('./controller/home')
const getPostController = require('./controller/getPost')
const storePostController = require('./controller/storePost')

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

// parser incoming request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(fileUpload())

// Listen to port 4000
app.listen(4000 , ()=>{
    console.log("App Listening to port 4000")
})

// routes
app.get('/', homeController)

app.get('/post/:postId', getPostController)

app.get('/posts/new', newPostController)

app.post('/posts/store', validateForm , storePostController)