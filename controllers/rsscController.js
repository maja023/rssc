const rsscSignupmodel = require("../model/rsscModel");
const deviceLoginModel = require("../model/loginDeviceModel");
const address = require("address");
const randomstring=require("random-string-generator");

const { sendEmail } = require("../helper/mail");
const random = require("random-string-generator");



const signupController = async (req, res) => {
  const dat = new Date();
  console.log(dat)
  //data maching
  const checkRoll = req.body.sRoll;
  const checkPhone = req.body.sPhone;
  const checkemail = req.body.sEmail;

  const tryRollMach = await rsscSignupmodel.findOne({ roll: checkRoll });
  const tryPhoneMach = await rsscSignupmodel.findOne({ phone: checkPhone });
  const tryEmailMach = await rsscSignupmodel.findOne({ email: checkemail });
  if (tryRollMach || tryPhoneMach || tryEmailMach) {
    res.render("studentSignup", {
      faild: "পূর্বে নিবন্ধিত হয়েছে",
    });
  } else {
    const accessToken=random(12,"lowernumeric");
    const signupData = new rsscSignupmodel({
      id: req.body.sRoll,
      name: req.body.sName,
      phone: req.body.sPhone,
      email: req.body.sEmail,
      group: req.body.sGroup,
      address: req.body.sAddress,
      roll: req.body.sRoll,
      session: req.body.sSession,
      studentStaus:"pending",
      studentBan:"false",
      studentAccessToken:accessToken,
      password: req.body.sPassword,
      Date: dat.toLocaleTimeString() + " - " + dat.toLocaleDateString(),
    });

    const rssSave = await signupData.save();
    if (rssSave) {
const userName=req.body.sName;
const userEmail=req.body.sEmail;
const studentRoll=req.body.sRoll;

      const mail=sendEmail(userName,userEmail,accessToken,studentRoll);
      if(mail){
       
        res.render("studentLogin", {
          status: `please Active Your Account send Mail ${req.body.sEmail}`,
        });


      }else{
        console.log("mail not send ")
      }
    } else {
      res.send("faild");
    }
  }
};



const studentPostLoginController=async(req,res)=>{
try {
  const {lPhone,lPassword}=req.body;
  const chekcExAccount=await rsscSignupmodel.findOne({phone:lPhone});
  if(chekcExAccount){
    if(chekcExAccount.password==lPassword){
      if(chekcExAccount.studentStaus=="pending"){
        res.render("studentLogin",{
          pending:" Please check Your Email And Active  Your Account "
        })
      }else{ 
        if(chekcExAccount.studentBan=="true"){
          res.render("studentLogin",{
            ban:"Your account has been Ban Please contact Authority"
          })
        }else{
          // success checkup now add cookie and redirect profile page
          res.cookie("auth",chekcExAccount._id);
          res.redirect('/profile')
       
        }
      }
    }else{
      res.render("studentLogin",{
        incorrect:"Email/Password Incorrect"
      })
   
    }

  }else{
    res.render("studentLogin",{
      wrongInfo:"Account Not Found First Regester "
    })
 
   
   
  }
  
} catch (error) {
  
}


}


const activeAccountController=async(req,res)=>{
const activationkeymail=req.params.active;
const studentVerified="verified";
const activationkeyDb=await rsscSignupmodel.findOne({studentAccessToken:activationkeymail});
const verifiedToken=await rsscSignupmodel.findOne({studentAccessToken:studentVerified});
 
if(activationkeyDb){
    activationkeyDb.studentAccessToken="verified";
    activationkeyDb.studentStaus="active";
    activationkeyDb.save();
    res.send(`Your Email has Been Verified Now You Can  Login <a href="/login">Login</a>`)
  
}else{

  if(verifiedToken){
    res.send(`Your Email Already Verified Please Login <a href="/login">Login</a>`)

  }else{

    res.send("Access Token Invalid")
  }
}
}

const aCon=(req,res)=>{
    res.send("you can access now")
}


const getProfileController=async(req,res)=>{
  const currentstudentId=req.studentId;
 if(currentstudentId){
  const crstudentData=await rsscSignupmodel.findOne({_id:currentstudentId});
  res.render("studentProfile",{
    studentpInfo:crstudentData
  });

 }else{

 res.render("studentLogin")

 }
}


 

module.exports={ signupController,studentPostLoginController,activeAccountController,getProfileController}
