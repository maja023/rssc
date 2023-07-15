const mongoose=require("mongoose");

const loginDeviceSchema=mongoose.Schema({
    id:{
        type:String,
        require:true
   
    },
    deviceName:{
        type:String,
        require:true
    },
    deviceModel:{
        type:String,
        require:true
    },
    deviceMac:{
        type:String,
        require:true
    },
    deviceIp:{
        type:String,
        require:true
    },
    loginTime:{
   
        type:String,
        
    }
})


module.exports=mongoose.model("loginDevice",loginDeviceSchema)