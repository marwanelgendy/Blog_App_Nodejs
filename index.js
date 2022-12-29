const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const config = require('./config')
const BlogPost = require('./models/BlogPost')
const validateForm = require('./middleware/validateForm')

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
app.get('/', async (req , res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index' , {blogposts})
})

app.get('/about', (req , res)=>{
    res.render('about')
})

app.get('/contact', (req , res)=>{
    res.render('contact')
})

app.get('/post/:postId', async (req , res)=>{

    const post = await BlogPost.findById(req.params.postId)
    res.render('post',{post})
})

app.get('/posts/new', (req , res)=>{
    res.render('create')
})

app.post('/posts/store', validateForm , async (req , res)=>{

    let image = req.files.image
    image.mv(path.resolve(__dirname , 'public/img' , image.name) , async(error)=>{
        await BlogPost.create({ ...req.body , image: '/img/'+image.name })
        res.redirect('/')
    })
})