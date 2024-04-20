const express = require('express')
const router = express.Router()
const {register, login , getUsers, update ,deleteUser} = require('../controllers/users')
const {verifyToken} = require('../middlewares/authMiddleware')
const multer = require('multer')


// function s
// ====================================================================


// image storing handle

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '_' + file.originalname)
    }
})
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





//==================POST-METHOD-ROUTES=====================

router.post('/register', upload.single('image') , register)
router.post('/login', login)

//==================PUT-METHOD-ROUTES=====================
router.put('/update/:id', upload.single('image'), update)

//==================GET-METHOD-ROUTES=====================
router.get('/login',(req, res)=>{
    res.send('login')
})

router.get('/users', getUsers);

router.get('/home',(req, res)=>{
    res.send('Home Page')
})

router.get('/register',(req, res)=>{
    res.send('register')
})
//==================DELETE-METHOD-ROUTES=====================
router.delete('/delete/:id',deleteUser)

module.exports.authRouter = router