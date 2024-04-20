const express = require('express');
const router = express.Router()
const {createPost, updatePost, getPost, deletePost, getAllPost} = require('../controllers/postController')
const {verifyToken} = require('../middlewares/authMiddleware')
const multer = require('multer')


// function s
// ====================================================================


// image storing handle

const storage = multer.memoryStorage()

// diskStorage({
//     destination: function(req, file, cb){
//         cb(null, 'uploads/');
//     },
//     filename: function(req, file, cb){
//         cb(null, Date.now() + '_' + file.originalname)
//     }
// })
const fileFiter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true)

    }else{
        cb(new Error('invalid format, allowed image only'))
    }
}
const upload = multer({
    storage: storage,
    fileFiter: fileFiter
})

router.post('/upload',verifyToken,upload.single('image'), createPost)
router.put('/updatepost',verifyToken,upload.single('image'),updatePost)
router.get('/getpost/:id', getPost)
router.get('/getposts', getAllPost)
router.delete('/deletepost/:id',verifyToken, deletePost)







module.exports.postRoutes = router