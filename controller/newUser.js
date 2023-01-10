module.exports = (req , res , next) => {
    
    let username = "";
    let password = "";
    let data = req.flash('data')[0]

    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }

    res.render('register' , {
        errors : req.flash('validationErrors'),
        username : username,
        password : password
    })
}