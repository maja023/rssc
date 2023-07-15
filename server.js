const express=require("express");
const app=express();
//setup data fatch 

//database set up
require('./model/db');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//cooke-parser setup 
const cookie=require('cookie-parser');
app.use(cookie());
//setup route 
const route=require('./routers/payRoute');
app.use(route);

const adminRoute=require('./routers/adminRoute');
app.use(adminRoute);

//ejs setup
app.set('view engine', 'ejs');
app.use(express.static('views'))
module.exports=app; 
