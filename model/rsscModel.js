const mongoose=require('mongoose');


const rsscScima=mongoose.Schema({
    id:{
        require:true,
        type:String

    },
    name:{
        require:true,
        type:String
    },
    group:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        
    },
    division:{
        type:String,
        require:true
    },
    address:{
    type:String,
    require:true
    },
    roll:{
        type:String,
        require:true      
    },
    session:{
        type:String,
        require:true
    },
    studentStaus:{
        type:String,
        require:true
    },
    studentBan:{
        type:String,
        require:true
    }, 
  
    studentAccessToken:{
        type:String,
        require:true
    },
  
    createdOn:{
        type:String
     
    }

})

module.exports=mongoose.model("rsscStudent",rsscScima);