module.exports = ( req , res , next) => {
    
    if(req.files == null || req.body.title == null || req.body.body == null){
        req.flash('validationErrors' , 'All fields are required')
        return res.redirect('/posts/new')
    }
    next()
}