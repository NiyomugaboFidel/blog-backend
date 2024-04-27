const {User} = require('../models/Users');
const {Post} = require('../models/posts');


const like = async(req, res)=>{
    try {
        const userId = req.user._id
        const postId = req.params.id

        const post = await Post.findById(postId);

        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        const alreadyExist = post.likesBy.includes(userId)

        if(alreadyExist){
            post.likeCount--;
            post.likesBy.pull(userId)
           // return res.status(200).json({message:'like removed'})
        }else{
            post.likeCount++;
            post.likesBy.push(userId)
            //return res.status(200).json({message:'like added'})

        }
        await post.save();
        res.json({ likesCount: post.likeCount });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Something went wrong'})
    }

}

module.exports = {like}