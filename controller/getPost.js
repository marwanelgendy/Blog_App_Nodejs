const BlogPost = require('../models/BlogPost')

module.exports = async (req , res)=>{
    const post = await BlogPost.findById(req.params.postId)
    res.render('post',{post})
}