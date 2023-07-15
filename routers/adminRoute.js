const adminRoute=require('express').Router();

const {getAdmin,postadminController,
    getadminsignupController,postadminsignupreq,
    getAdminListController,getAdmindltController,
    getConfirmadminController,getRestricadminController,
    getLoginDeviceController


}=require('../controllers/admincontroller')


adminRoute.get('/admin',getAdmin);

adminRoute.post('/admin',postadminController);

adminRoute.get('/adminsignup',getadminsignupController)
adminRoute.post('/adminsignupreq',postadminsignupreq)
adminRoute.get('/adminlist',getAdminListController)
adminRoute.get('/admin-delete/:id',getAdmindltController)
adminRoute.get("/confirm/:id",getConfirmadminController)
adminRoute.get("/restric/:id",getRestricadminController)
adminRoute.get('/login-device',getLoginDeviceController)


module.exports=adminRoute;