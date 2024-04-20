const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const userShema = new Schema({
    username :{
        type: String,
        required: true,
        unique : true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        minlength: 8,

    },
    imageUrl:{
          type: String,
          
    },
    role: {
        type: String,
        required:true,
        enum: ['admin','auth','user'],
        default: 'user'
    }

},{
    timestamps: true
})


const User = mongoose.model('User', userShema);

module.exports.User = User
