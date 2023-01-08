const User = require('../models/Users')
const bcrypt = require('bcrypt')

module.exports = (req , res , next) =>{
    const {username , password} = req.body

    User.findOne({username : username} , (error , user) =>{

        if(user){
            bcrypt.compare(password , user.password , (error , same)=>{
                if(same){
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else{
                    res.redirect('/auth/login')
                }
            })
        }else{
            res.redirect('/auth/login')
        }
    })
    
}