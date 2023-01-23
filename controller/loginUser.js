const User = require('../models/Users')
const bcrypt = require('bcrypt')

module.exports = (req , res , next) =>{
    const {username , password} = req.body

    User.findOne({username : username} , (err , user)=>{
        // console.log(user)
       
        if(user){
            bcrypt.compare(password , user.password , (error , same)=>{
                if(same){
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else{
                    const ValidatoinErrors = "Password is incorrect"
                    req.flash('validationErrors' , ValidatoinErrors)
                    res.redirect('/auth/login')
                }
            })
        }else{
            const ValidatoinErrors = "The Username Or Password is incorrect"
            req.flash('validationErrors' , ValidatoinErrors)
            
            res.redirect('/auth/login')
        }
    })
    
}