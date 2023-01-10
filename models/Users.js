const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    username : {
        type : String,
        required : [true , 'Please provide username'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Please provide password']
    }
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save' , function(next){
    const user = this

    bcrypt.hash(user.password , 10 , (err,hash)=>{
        user.password = hash
        next()
    })
})

const User = mongoose.model('users' , UserSchema)

module.exports = User