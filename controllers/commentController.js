const {User} = require('../models/Users');
const {Post, Comment} = require('../models/posts');



const comment = async(req, res)=>{

    try {
        const userId = req.user._id;
        const postId = req.params.id;
        const content = req.body;
        console.log(content)
        const user = await User.findById(userId)

       const post =  await Post.findById(postId)

        if(!post){
            return res.status(400).json({message:'post not found'})
        }
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        if(!comment){
            return res.status(400).json({message:'feil required  space found'})
        }

            
        const newComment = new Comment({
            content:content.comment,
            avatar:user.imageUrl,
            username: user.username,
            userId: userId,
            postId:postId
        })
        post.comments.push(newComment._id);
        await post.save()
        await newComment.save()

   
        return res.status(201).json({message:'Comment created successful', comment: newComment})

        
        
    } catch (error) {
       console.log(error)
        return res.status(500).json({message:'Something went wrong'})
        
    }

}

const getCommnts =async (req, res)=>{

    try {
        const postId = req.params.id

        const post = await Post.findById(postId)
        if(!post){
            return res.status(400).json('Post with this id not found') 
        }

       const postedComment = await Comment.find({postId}).sort({_id: -1})
       

        if(!postedComment){

            return res.status(400).json('Not comment with this post')
        }

    return res.status(200).json({message:'get comments Successful', comments: postedComment})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Something went wrong'});

        
    }

}
const deleteComment = async(req,res) =>{

    try {
        
        const id = req.params.id

        const deletedComment = await Comment.findByIdAndDelete(id)

        if(!deletedComment){
            return res.status(400).json({message:'failed to delete comment'})
        }

        return res.status(200).json({message: 'Comment deteled successful', commentDeleted: deletedComment})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Something went wrong'})
        
    }

}

module.exports = {comment, deleteComment, getCommnts}