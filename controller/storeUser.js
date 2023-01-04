const User = require('../models/Users')

module.exports = (req , res , next) =>{
    User.create(req.body , (err , user)=>{

        if(err){
            res.redirect('/auth/register')
        }
        
        res.redirect('/')
    })
}