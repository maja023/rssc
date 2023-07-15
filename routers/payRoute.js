const cookie=require('cookie-parser')
const payRoute=require('express').Router();

//validaton 
const {signupValidation}=require('../middlewares/singupValidation');
const {loginValidation}=require('../middlewares/loginValidation');
const {signupValidationResult,loginValidationResult}=require('../middlewares/validationResult');

//import controller
const {signupController,studentPostLoginController,activeAccountController,getProfileController}=require('../controllers/rsscController');
const { isLoggedin } = require('../helper/isLoggedin');
 

payRoute.get("/",(req,res)=>{
    res.render('index');
});




payRoute.get('/login',(req,res)=>{
        res.render('studentLogin');
});

// student login post routu

payRoute.post("/login-process",loginValidation,loginValidationResult,studentPostLoginController);


payRoute.get('/signup',(req,res)=>{

    const currentUser=req.cookies.name;
    if(currentUser){
    res.redirect('/');

    }else{
        res.render('studentSignup')
    }
});

payRoute.post('/signup-process',signupValidation,signupValidationResult,signupController);

payRoute.get('/active-account/:active',activeAccountController)

payRoute.get('/about',(req,res)=>{
    res.render('about')
});


//cookie section




payRoute.get('/profile/',isLoggedin,getProfileController)

payRoute.get('/student-logout',(req,res)=>{
    res.send("student Logout")
})




module.exports=payRoute;   