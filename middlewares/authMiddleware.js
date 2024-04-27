const jwt = require('jsonwebtoken')
const {User} = require('../models/Users')

const maxAge = 24 * 60 * 60 * 3

// craete JWT Token
const createToken = (id, role) =>{
  const user = {id:id , role:role}
    return jwt.sign(user, process.env.JWT_SECRET_KEY,{expiresIn: maxAge})
  
  }


const verifyToken = (role) =>{

    return (req, res, next)=>{
        //const token= req.cookies.jwt
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];



    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
         jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decodeToken)=>{
            if(err){
                console.log(err)

                res.redirect('/login')
            }

            console.log(decodeToken)
            
            const user = await User.findById(decodeToken.id)

            req.user = user
            
                   // Check if user has the required role
      if (!decodeToken.role.includes(role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }else{
      next();


      }
      

        })
    

    } catch (error) {
        console.log(error.message)
        return res.status(403).json({ message: 'Invalid token' });
    }
  
     
}

}

module.exports = {verifyToken , createToken}