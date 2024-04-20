const {Post} = require('../models/posts')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2

// create token
const createToken = (postId ,userRole)=>{
    const payload = {id:postId, role:userRole}
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, (err, token)=>{
        if(err){
            console.log('Error deteced', err.message)
        }

        console.log('token:', token)
    })
}



const createPost = async(req, res)=>{

    try {
        
    } catch (error) {
        
    }
}
const updatePost = async(req, res)=>{

    try {
        
    } catch (error) {
        
    }
}
const getPost = async(req, res)=>{

    try {
        
    } catch (error) {
        
    }
}
const getAllPost = async(req, res)=>{

    try {
        
    } catch (error) {
        
    }
}
const deletePost = async(req, res)=>{

    try {
        
    } catch (error) {
        
    }
}


module.exports = {createPost, updatePost, getPost,getAllPost, deletePost}