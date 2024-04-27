const multer = require('multer')


// function s
// ====================================================================


// image storing handle

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '_' + file.originalname);
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

// // Set up Multer for file uploads
// const upload = multer({ dest: 'uploads/' });

module.exports = {upload}