const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session')
const jwt  = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const {authRouter} = require('./routes/auth');
const { verifyToken } = require('./middlewares/authMiddleware');
const {postRoutes} = require('./routes/PostRoutes')
const cloudinary = require('cloudinary').v2
const bodyParser = require('body-parser')
const cors = require('cors');


cloudinary.config({ 
    cloud_name: 'dmosnjgob', 
    api_key: '369294766619965', 
    api_secret: 'pepLrf4kyK20AYyeQKifMAhpkmc' 
  });

dotenv.config();

const app = express();

//console.log(require('crypto').randomBytes(64).toString('hex') )
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors())
// app.use(session({
//     secret : process.env.JWT_SECRET_KEY,
//     resave : false,
//     saveUninitialized: false,
// }))

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
    //  useNewUrlParser: true, useUnifiedTopology: true 
})
 .then(() => console.log('MongoDB Connected'))
 .catch(err => console.error(err));

// Middleware Routes
app.use('/', authRouter);
app.use('/post', postRoutes);


app.get('/dash',verifyToken('user'), (req, res)=>{
   return res.send('AdminDashboad')
})

app.get('/userdash',verifyToken('user'), (req, res)=>{
    res.send('userDashboad')
})

app.get('/authdash',verifyToken('auth'), (req, res)=>{
    res.send('authDashboad')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
