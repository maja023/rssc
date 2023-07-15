const {validationResult}=require('express-validator')

const signupValidationResult=(req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert=errors.array();
     return res.render('studentSignup',{ 
        alert
      })
    };
    next();
};
  

const loginValidationResult=(req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alertnow=errors.array();
   return res.render('studentLogin',{ 
      alertnow
    })
  };
  next();
}

module.exports={signupValidationResult,loginValidationResult}