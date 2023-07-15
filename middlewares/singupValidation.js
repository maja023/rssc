const {check}=require('express-validator');

const signupValidation=[
    check("sRoll")
    .trim()
    .notEmpty()
    .isLength({min:6}).withMessage("রোল নম্বর ভুল")
    .isLength({max:6}).withMessage("রোল নম্বর ভুল"), 
    check("sPhone").notEmpty()
    .trim()
    .isLength({min:11})
    .withMessage("সঠিক ফোন নম্বর দিন") ,
    check("sPassword")
    .trim()
    .notEmpty()
    .isLength({min:5}).withMessage("পাসওয়ার্ড সর্বনিম্ন 5-digit ব্যবহার করুন "),

 
    
]


module.exports={signupValidation}

