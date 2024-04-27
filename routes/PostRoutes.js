const express = require('express');
const router = express.Router()
const {createPost, updatePost, getPost, deletePost, getAllPost} = require('../controllers/postController')
const {verifyToken} = require('../middlewares/authMiddleware')
const {upload} = require('../middlewares/uploadImage')
const {like} = require('../controllers/likeController')
const {comment,deleteComment,getCommnts} = require('../controllers/commentController')


router.post('/:id/comment',verifyToken('admin'), comment)
router.put('/:id/like',verifyToken('user'), like);
router.post('/upload',verifyToken('user'),upload.single('image'), createPost);
router.put('/updatepost/:id',verifyToken('user'),upload.single('image'),updatePost);
router.get('/getpost/:id', getPost);
router.get('/getposts', getAllPost);
router.delete('/deletepost/:id', deletePost);
router.get('/:id/comments',getCommnts)
router.get('/deletecomment/:id',deleteComment)







module.exports.postRoutes = router