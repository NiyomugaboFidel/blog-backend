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
    date:{
        type: Date,
        default: Date.now
    },
    likes: {
      type: Number,
      default : 0
    },
    Comments : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }]
    }

})


const CommentSchema = new mongoose.Schema({
      Comment : {
        type: String,
        required: true,
      },

      user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required :true,
      },

      date : {
        type: Date,
        default : Date.now

      }
})

const Comment = mongoose.model('Comment', CommentSchema)

const Post  = mongoose.model('Post', postSchema)


module.exports = {Post, Comment}

