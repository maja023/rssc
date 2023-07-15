const isLoggedin=(req,res,next)=>{
const currentstudent=req.cookies.auth;
if(!currentstudent){
res.redirect("login");

}else{

req.studentId=currentstudent;
next();

}

}

module.exports={isLoggedin}