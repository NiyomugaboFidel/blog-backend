const mongoose = require('mongoose')
const schema  = mongoose.Schema

const postSchema = new schema({
    imageUrl: {
        type: String,
        required : true,
    },
    title: {
      type: String,
      required: true
    },
    description :{
        type: String,
        required: true,

    },
    avatar: {
      type: String,
      required: true,
    },
    username:{
      type: String,
      required: true,

    },
    likeCount: {
      type: Number,
      default : 0
    },
    likesBy:{
          type:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
          
    },
    comments : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }]
    },
    date : {
      type: Date,
      default : Date.now

    }

})


const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username:{

    type : String,
    require: true
  } , // Add field for username
  avatar:{
    type: String,
    required : true

  } ,// Add field for avatar
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

const Post  = mongoose.model('Post', postSchema)


module.exports = {Post, Comment}

