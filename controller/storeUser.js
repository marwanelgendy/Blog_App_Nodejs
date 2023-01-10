const User = require('../models/Users')

module.exports = (req , res , next) =>{
    User.create(req.body , (err , user)=>{

        if(err){
            
            const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
            req.flash('validationErrors' , validationErrors)
            req.flash('data' , req.body)    
            return res.redirect('/auth/register')
        }
        
        res.redirect('/')
    })
}