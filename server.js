const express = require('express');
const cors =require('cors');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const dbConnect = require('./config/dbconnection')
const errorHandler = require('./errorHandler/error');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser')
const Employee = require('./models/empmodels');


dbConnect();
const app = express(); 
// app.use(express.urlencoded({extended:false})); 
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 5000; 

app.use(
  session({
      secret: "key that will sign cookie",
      resave: false,
      saveUninitialized: false,
  })
);

function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next(); 
  } else {
    res.redirect('/main'); 
  }
}



app.use(express.json());
app.use(cors());
app.use('/api/employees',require('./routes/emproute'));
app.use('/api/users',require('./routes/userroute'))

// search bar
// app.get('/api/search/:key', async (req, res) => {
//   try {
//     const regex = new RegExp(req.params.key,'i'); 
//     const data = await Employee.find({
//        $or: [
//         { firstName: { $regex: regex } },
//         { lastName: { $regex: regex } },
//       ],

//     });
//     res.send(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });



app.use(errorHandler);

app.set("view engine","ejs");

app.use(express.static("uploads"));
app.use('/css',express.static(path.resolve(__dirname,"Assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"Assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"Assets/js")));
app.use('/uploads',express.static(path.resolve(__dirname,"uploads")));




app.get('/register', (req,res) => {
  res.render('register'); 
})

app.get('/', (req,res) => {
  res.render('login'); 
})

app.get('/main', isAuthenticated, (req,res) => {
    res.render('main'); 
  })

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
}); 