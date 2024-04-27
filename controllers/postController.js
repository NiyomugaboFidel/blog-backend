const {Post} = require('../models/posts')
const {User} = require('../models/Users')
const cloudinary = require('cloudinary').v2






const createPost = async(req, res)=>{


    try {
        const {title, description} = req.body
        const file = req.file
        const userId = req.user._id
        const user = await User.findById(userId)
   
        if(!title || !description){
            return res.status(400).json({message:'All fields are required'})
        }
     await cloudinary.uploader.upload(req.file.path, async(err, result)=>{

    if(err){
        console.log(err);
        return res.status(400).json({message: 'Failed to Post Image'})
    }

    console.log(result.url)

    const imageUrl = result.url

    

    const newPost =  new Post({
        imageUrl: imageUrl,
        title:title,
        description: description,
        username: user.username,
        avatar: user.imageUrl,

    })
     await newPost.save()

  return res.status(201).json({message:'Upload successful', post: newPost})
  });
 // return res.status(201).json({message:'Upload successful'})

    } catch (error) {
         console.log(error)
         return res.status(500).json({message: 'Something went wrong'})
    }
}
const updatePost = async(req, res)=>{

   
    try {
        const {title, description} = req.body
        const file = req.file
        const userId = req.user._id
        const postId = req.params.id
        const user = await User.findById(userId)
       // console.log(user)
       const post = await Post.findById(postId)
       //console.log(post)

       if(!post){
         return res.status(404).json({message:'Post not found'});
       }

        if(!title || !description){
            return res.status(400).json({message:'All fields are required'})
        }

     await cloudinary.uploader.upload(req.file.path, async(err, result)=>{

    if(err){
        console.log(err);
        return res.status(400).json({message: 'Failed to Post Image'})
    }

    console.log(result.url)

    const imageUrl = result.url
    const newPost ={
        imageUrl: imageUrl,
        title:title,
        description: description,
        username: user.username,
        avatar: user.imageUrl,

    }
    const updatedPost = await Post.findByIdAndUpdate(postId, newPost,{new: true} )
     await updatedPost.save()

  return res.status(201).json({message:'Upload successful', post: updatedPost})
  });
 // return res.status(201).json({message:'Upload successful'})

    } catch (error) {
         console.log(error)
         return res.status(500).json({message: 'Something went wrong'})
    }
}
const getAllPost = async(req, res)=>{

    try {
        const posts = await Post.find().sort({_id:-1})
        return res.status(200).json({message:'get all post successful', posts:posts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:' Something went long'})
    }
}
const getPost = async(req, res)=>{

 
    try {
        const postId = req.params.id
        const post = await Post.findOne({_id:postId})
        return res.status(200).json({message:'get post successful', post:post})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:' Something went long'})
    }
}
const deletePost = async(req, res)=>{
 
    try {
        const postId = req.params.id
        console.log({postId:postId})

        const deletedPost = await Post.findByIdAndDelete(postId)
        if(!deletedPost){
            return res.status(404).json({message: 'Failed to delete post'})
        }
         return res.status(200).json({message:'delete post successful', post:deletedPost})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:' Something went long'})
    }
    
}


module.exports = {createPost, updatePost, getPost,getAllPost, deletePost}