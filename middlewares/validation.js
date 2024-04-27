const validator = require('validator')

// VALIDATION,EMAIL,PASSWORD,EMAIL

function isValidUsername(username){

    return validator.isAlphanumeric(username) && validator.isLength(username, {min:3 , max:20})
}

function isValidEmail(email){
    
    return validator.isEmail(email);
}

function isValidPassword(password) {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[^\s]).{8,}$/;
    return passwordRegex.test(password);
  }

module.exports = {isValidEmail, isValidPassword, isValidUsername}