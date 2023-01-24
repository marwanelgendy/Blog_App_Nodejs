module.exports = (req , res)=>{
    
    res.render('create' ,{
        error : req.flash('validationErrors'),
        createPost : true
    })
}