const mongoose=require('mongoose');
const connect=mongoose.connect("mongodb+srv://soikat23:soikat@cluster0.p47ebci.mongodb.net/rsscDb")
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("database not connected"); 
})
