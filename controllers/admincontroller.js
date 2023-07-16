const adminMacmodel = require("../model/adminmacModel");
const deviceLoginModel = require("../model/loginDeviceModel");
const address = require("address");
 


///admin section
 
const getAdmin = async (req, res) => {
    const crUser=req.cookies.phone;
    if(crUser){
        res.redirect("/adminlist")
    }else{        
      res.render("adminLogin");
    }
  }
    


const postadminController = async(req, res) => {
const {aPhone,amac,aPassword}=req.body;

const mactAlogindata=await adminMacmodel.findOne({
    adminNumber:aPhone,
    adminPassword:aPassword,
    adminStutas:"confirm"
});

if(mactAlogindata ){

    if(!mactAlogindata){
        res.render("adminLogin",{
            astutas:"Your account has been pending!",
            ipaddress:amac

        })
    }else{
      address.mac(async (err, addr) => {
        // get device information collect 
        const dat=new Date();
        const os=require("os");
        const devieinfoInserquery=await new deviceLoginModel({
          id:mactAlogindata.id,
          deviceName:os.hostname(),
          deviceModel:os.version(),
          deviceMac:addr,
          deviceIp:address.ip(),
          loginTime: dat.toLocaleTimeString() + " - " + dat.toLocaleDateString()
        })

        const datasaveQ=devieinfoInserquery.save();
      if(datasaveQ){
        res.cookie('phone',aPhone).redirect('/adminlist'); 
      }else{
        res.send("device not found")
      }
    })
    }

}else{

  res.render("adminLogin",{
    wrong:"Admin Number Or Password  Incorrect!",
    ipaddress:amac
  })
}
};

//admin sign up form render
const getadminsignupController = (req, res) => {
  address.mac(async (err, addr) => {
    res.render("adminSignup", {
      userIpaddress: addr,
    });
  });
};

const postadminsignupreq = (req, res) => {
  address.mac(async (err, addr) => {
    const userMacaddress = req.body.ausermac;
    const userphnNumber = req.body.aPhone;
    const matchmacquery = await adminMacmodel.findOne({
      adminMac: userMacaddress,
    });
    const matchphnquery = await adminMacmodel.findOne({
      adminNumber: userphnNumber,
    });
    if (matchmacquery || matchphnquery) {
      res.render("adminSignup", {
        alreadyReqIp: "Already Regester MAc ",
        userIpaddress: addr,
      });
    } else {
      const dat = new Date();
      const alldata = await adminMacmodel.find();
      // const idgen = parseInt(alldata[alldata.length - 1].id);
      // const orid = idgen + 1;

      const addUserMacAddressQuery = await new adminMacmodel({
        id: 1001,
        adminMac: req.body.ausermac,
        adminNumber: req.body.aPhone,
        adminPassword: req.body.aPassword,
        adminStutas: "pending",
        createdOn: dat.toLocaleTimeString() + " - " + dat.toLocaleDateString(),
      });

      const addmac = addUserMacAddressQuery.save();
      if (addmac) {
        res.render("adminSignup", {
          pending:
            "Successfully Submited Your Data Wait Few Moments! Than Visible",
        });
      } else {
        res.send("Mac invalid");
      }
    }
  });
};

const getAdminListController = async (req, res) => {
    const cruser=req.cookies.phone;
if(cruser){
    const alladmins = await adminMacmodel.find();
    res.render("admin/adminList", {
      users: alladmins,
    });
}else{
    res.redirect('/admin')
}
};

const getAdmindltController = async (req, res) => {
  const deleteAdminid = req.params.id;
  const deletequery = await adminMacmodel.deleteOne({ id: deleteAdminid });
  const admins = await adminMacmodel.find();
  if (deletequery) {
    res.render("admin/adminList", {
      successfully_delete: `${deleteAdminid} Id Admin Has Been Deleted`,
      users: admins,
    });
  } else {
    res.send("can't delete");
  }
};


const getConfirmadminController=async(req,res)=>{
const confirmAid=req.params.id;
const confirmQuery=await adminMacmodel.findOne({id:confirmAid});
if(confirmQuery){
   confirmQuery.adminStutas="confirm";
    await confirmQuery.save();
    res.redirect("/adminlist")
}
}


const getRestricadminController=async(req,res)=>{
    const restricId=req.params.id;
    const restricQuery=await adminMacmodel.findOne({id:restricId});
    if(restricQuery){
        restricQuery.adminStutas="pending";
        await restricQuery.save();
        res.redirect("/adminlist")
    }
}



const getLoginDeviceController=(req,res)=>{
  address.mac(async (err, addr) => {
    const macAddress=addr;
  })

}



module.exports = {
 
  postadminController,
  getAdmin,
  getadminsignupController,
  postadminsignupreq,
  getAdminListController,
  getAdmindltController,
  getConfirmadminController,
  getRestricadminController,
  getLoginDeviceController
 
}
