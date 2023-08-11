const express = require('express');
// const session = require('express-session')
const dbConnect = require('./config/dbconnection')
const errorHandler = require('./errorHandler/error');
const dotenv = require('dotenv').config();
const path = require('path');

dbConnect();
const app = express();  
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/employees',require('./routes/emproute'))
app.use(errorHandler);

app.set("view engine","ejs");

app.use('/css',express.static(path.resolve(__dirname,"Assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"Assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"Assets/js")));


app.get('/', (req,res) => {
    res.render('main'); 
  })

 
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
}); 