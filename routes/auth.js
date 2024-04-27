const express = require('express')
const router = express.Router()
const {register, login , getUsers, update ,deleteUser} = require('../controllers/users')
const {verifyToken} = require('../middlewares/authMiddleware')
const {upload} = require('../middlewares/uploadImage')



//==================POST-METHOD-ROUTES=====================

router.post('/register', upload.single('image') , register)
router.post('/login', login)

//==================PUT-METHOD-ROUTES=====================
router.put('/update/:id', upload.single('image'), update);

//==================GET-METHOD-ROUTES=====================
router.get('/login',(req, res)=>{
    res.send('login')
})

router.get('/users',verifyToken('user') ,getUsers);

router.get('/home',(req, res)=>{
    res.send('Home Page')
})

router.get('/register',(req, res)=>{
    res.send('register')
})
//==================DELETE-METHOD-ROUTES=====================
router.delete('/delete/:id',deleteUser)

module.exports.authRouter = router