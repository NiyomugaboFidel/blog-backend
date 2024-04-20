const jwt = require('jsonwebtoken')
const {User} = require('../models/Users')



const verifyToken = (role) =>{

    return (req, res, next)=>{
    const cookies = req.cookies
    const token = cookies.jwt
    if(token){

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodeToken)=>{
            if(err){
                console.log(err)
                res.redirect('/login')
            }else{

                if(decodeToken.role !== role && decodeToken.role !== 'admin'){
                    res.redirect('/home')
                }else{

                    next()

                }
             console.log(decodeToken)
             
            }
        })
    }else{
        res.redirect('/login')
    }
    
     
}

}

module.exports = {verifyToken}