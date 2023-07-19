const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'majaharul2k23@gmail.com', 
    pass: 'maoyegetxfklfgad'
  }
});






const sendEmail=async(userName,userEmail,accessToken,studentRoll)=> {


    const html=`
    <div class="mailMian" style='padding: 0;
    margin: auto;'>
        <div class="mailH" style='background: #1d1d47;
        color: white;'>
            <h2 style='padding: 13px;
            font-family: sans-serif;
            text-align: center;'>Welcome To RSSC</h2>
        </div>
        <b>Dear  ${userName},</b>
        <p style='
        font-size: 16px;
        text-transform: capitalize;line-height: 31px;
        font-family: system-ui;'>roll ${studentRoll} . you need to activate your account before Login. click the below button.</p>
        <a style="background: #38b738;
        color: white;
        padding: 12px 42px;
        font-weight: bold;
        letter-spacing: 0px;
        text-decoration: none;
        border-radius: 2px;
        font-family: sans-serif;
        margin: auto;
        width: 200px;
        display: block;
        text-align: center;   margin-top: 50px;
        margin-bottom: 43px;" href="https://rssc-5o4a.onrender.com/active-account/${accessToken}">Active Account</a>
        <p>Regards,</p>
        <small"> RSSC</small>
    </div>`;
      





try { 
    const info = await transporter.sendMail({
        from: 'majaharul2k23@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: "Account Activation ", // Subject line
        html:html
      });
     console.log("messge  send")
      
    
} catch (a) {
    console.log("messge not send" + a)
}

}

module.exports={sendEmail};
