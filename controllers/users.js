
const {User} = require('../models/Users')
const bcrypt = require('bcrypt')
const e = require('express')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const cloudinary = require('cloudinary').v2
const {createToken} = require('../middlewares/authMiddleware')
const cookieParser = require('cookie-parser')
const {isValidEmail, isValidPassword, isValidUsername} = require('../middlewares/validation')

// =========================REUSEBLE_FUNCTION=======================

 // create maxAge time of 3days in secound

const maxAge = 24 * 60 * 60 * 3
let imageUrl;



   //===============REGISTER_CONTROLLER-FUNCTION==================

const register =  async(req, res) =>{
    try {
        const {username , email ,password} = req.body
       const file = req.file
       console.log(file)
       

        if(!username || !email || !password){
          return res.status(400).json({msgErr: 'All feilds are required'})
        }
        const nameExist = await User.findOne({usernama:username})
        if(nameExist){
            return res.status(400).json({msgErr : 'User with this Username already  exist'})
        }
        const emailExist = await User.findOne({email:email})
        if(emailExist){
            return res.status(400).json({msgErr : 'User with this email already exist'})
        }

              // Validate username
             if (!isValidUsername(username)) {
                return res.status(400).json({ msgErr: 'Invalid username format' });
            }

             // Validate email
            if (!isValidEmail(email)) {
                return res.status(400).json({ msgErr: 'Invalid email format' });
            }

             // Validate password
            if (!isValidPassword(password)) {
                return res.status(400).json({ msgErr: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
            }
            if(!password.length >= 8){
              return res.status(400).json({msgErr: 'Password must be at least 8 characters long'});
            }

          //  if(!file){
          //      return res.status(400).json({msgErr: 'image required'})
           // }
    

            await cloudinary.uploader.upload(req.file.path, async(err, result)=>{
                if(err){
                    console.log('failed to upload image:', err.message)
                    return res.status(500).json({msgErr: 'image uploading is failed'})
                }

                console.log(result.url)
                imageUrl = result.url
                
             // hashing password 
             const hashPassword = await bcrypt.hash(password, 10)
             // create new user
             const newUser = await User.create({
                   username: username,
                   email : email,
                   imageUrl: imageUrl,
                   password: hashPassword
             })
          
             await newUser.save()

             
                //return res.status(200).json({msgSucc:'uploading successful'})

                const user = await User.findOne({email})
                const token  = createToken(user._id, user.role)
         
               await res.cookie('jwt', token, {httpOnly: true})
               

                console.log(token)

             return res.status(201).json({msgSucc: 'User created Successful', token})
                  
        

            })
 
         
      

     
    } catch (error) {
        
        console.error(error)
        return res.status(500).json({msgErr:'Something went wrong'})
    }
}
   //===============LOGIN_CONTROLLER-FUNCTION==================

const login = async (req , res) =>{
    try {
        const { email, password} = req.body
        if( !email || !password){
            return res.status(400).json({msgErr: 'All feild required'})
        }
         // correct email
        let user = await User.findOne({email})
        // Match password
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!user || !isMatch){
            return res.status(400).json({msgErr:'Invalid Credentials'})
        }
        //    // create token
        const token  = createToken(user._id, user.role)

      await  res.cookie('jwt',token, {httpOnly: true, maxAge: maxAge * 1000})
        // console.log(token)
    
 return res.status(200).json({msgSucc: `Login successful , your Welcame ${user.username}`, token, userAvatar: user.imageUrl,username: user.username})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msgErr: 'Something went long'})
    }
}

   //===============getALL-USERS_CONTROLLER-FUNCTION==================

const getUsers  = async(req, res) => {

    try {
        const users  = await User.find().select('-password').sort({_id: -1})
        return res.status(200).json({users:users})  
    } catch (error) {
        console.log(error)
        return res.status(500).json({msgErr:' Something went long'})
    }
}

// USER UPDATE DATA

const update = async (req, res)=>{

    const {username , email, role ,password} = req.body
    
    try {
       
        const id = req.params.id
        const user = await User.findOne({_id : id})

        if(!user){
            return res.status(404).json({msgErr:'User not found'})
        }

            // Validate username
            if (!isValidUsername(username)) {
                return res.status(400).json({ msgErr: 'Invalid username format' });
            }

             // Validate email
            if (!isValidEmail(email)) {
                return res.status(400).json({ msgErr: 'Invalid email format' });
            }

             // Validate password
            if (!isValidPassword(password)) {
                return res.status(400).json({ msgErr: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
            }
            if(!password.length >= 8){
              return res.status(400).json({msgErr: 'Password must be at least 8 characters long'})
            }

        const hashPassword = await bcrypt.hash(password,10);
        
        const updatedUser = {
            username : username,
            role : role,
            email: email,
            password : hashPassword,
        }

        const userUpdate= await User.findByIdAndUpdate(id, updatedUser, {new:true})
         await userUpdate.save()

         // removing expaide token in cookies
         res.cookie('jwt', '', {maxAge:1})

         // reset Token after update user

         const updateduser = await User.findOne({email})

         const token  = createToken(updateduser._id, updateduser.role)

         res.cookie('jwt',token, {httpOnly: true, maxAge: maxAge * 1000})
          console.log(token)

         return res.status(200).json({msgSucc: 'User update successful',user:userUpdate})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msgErr:'Something went long'})
    }
}
   const deleteUser = async(req, res)=>{
    try {
        const userId = req.params.id;
        
        console.log('userId',userId)

        const deletedUser = await User.findByIdAndDelete(userId);


        if(!deletedUser){
            return res.status(403).json({msgErr:'Failed to Delete user'})
        }

            return res.status(200).json({msgSucc:`User Know as ${deletedUser.username} delete Successfu`})

    } catch (error) {
        console.log(error)
        return res.status(500).json({msgErr:'Something went long'})

    }
   }

module.exports = { register, login, getUsers, update, deleteUser}