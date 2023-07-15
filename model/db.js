const mongoose=require('mongoose');
const connect=mongoose.connect("mongodb://127.0.0.1:27017/rsscDb")
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("database not connected");
})