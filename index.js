const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const config = require('./config')
const flash = require('connect-flash');

// MiddleWare Function
const validateForm = require('./middleware/validateForm')
const authMiddleware = require('./middleware/auth')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticated')

// Controllers Function
const newPostController = require('./controller/newPost')
const homeController = require('./controller/home')
const getPostController = require('./controller/getPost')
const storePostController = require('./controller/storePost')
const newUserController = require('./controller/newUser')
const storeUserController = require('./controller/storeUser')
const loginController = require('./controller/login')
const loginUserController = require('./controller/loginUser')
const logoutUserController = require('./controller/logoutUser')

// Global Variables
global.loggedIn = null;

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
app.use(expressSession({
    secret : '12345'
}))
app.use('*' , (req , res , next) =>{
    loggedIn = req.session.userId
    next()
})
app.use(flash())

// Listen to port 4000
app.listen(4000 , ()=>{
    console.log("App Listening to port 4000")
})

// routes
app.get('/auth/login', redirectIfAuthenticatedMiddleware ,loginController)

app.post('/user/login', redirectIfAuthenticatedMiddleware ,loginUserController)

app.get('/auth/register' ,redirectIfAuthenticatedMiddleware , newUserController)

app.post('/user/register' , redirectIfAuthenticatedMiddleware , storeUserController)

app.get('/user/logout' , logoutUserController)

app.get('/', homeController)

app.get('/post/:postId', getPostController)

app.get('/posts/new', authMiddleware ,newPostController)

app.post('/posts/store', validateForm , storePostController)

app.use((req, res) => res.render('notfound'));