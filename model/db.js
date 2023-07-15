const mongoose=require('mongoose');
require("dotenv").config();
const dburl=process.env.db_url
const connect=mongoose.connect(dburl)
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("database not connected"); 
})
