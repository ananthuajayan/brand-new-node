const express = require('express');
const cors =require('cors')
// const session = require('express-session')
const dbConnect = require('./config/dbconnection')
const errorHandler = require('./errorHandler/error');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
// const multer = require('multer');


dbConnect();
const app = express(); 
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 5000;


app.use(express.json());

app.use(cors());
app.use('/api/employees',require('./routes/emproute'))
app.use(errorHandler);

app.set("view engine","ejs");

app.use(express.static("uploads"));
app.use('/css',express.static(path.resolve(__dirname,"Assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"Assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"Assets/js")));
app.use('/uploads',express.static(path.resolve(__dirname,"uploads")));




app.get('/', (req,res) => {
    res.render('main'); 
  })

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
}); 