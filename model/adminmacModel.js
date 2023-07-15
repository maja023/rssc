const mongoose=require('mongoose');


const adminMacScima=mongoose.Schema({
    id:{
        require:true,
        type:String

    },
    adminMac:{
        type:String,
        require:true
    },
    adminNumber:{ 
        require:true,
        type:String
    },

    adminPassword:{
        type:String,
        require:true
    },
    adminStutas:{
        type:String,
        require:true
    },
    
    createdOn:{
        type:String
     
    }

})

module.exports=mongoose.model("adminMactable",adminMacScima);