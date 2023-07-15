const {check}=require('express-validator');

const loginValidation=[
    check("lPhone")
    .trim()
    .notEmpty()
  
    .isLength({max:11}).withMessage("রোল নম্বর ভুল"), 
    check("lPassword").notEmpty()
    .trim()
    .isLength({min:3}).withMessage("Password minimum 5 chart")
 

    
]
 

module.exports={loginValidation}

