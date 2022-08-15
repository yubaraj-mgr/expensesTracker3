import nodemailer from "nodemailer";

const emailProcessor = async (emailbody) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "	eloisa.zieme@ethereal.email", // generated ethereal user
        pass: "uJEHUdMbs3mTbC4Tcq", // generated ethereal password
      },
    });
    let SendEmail = await transporter.sendMail(emailbody);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(SendEmail));
  } catch (error) {
    error && console.log(error);
  }
};

export const sendemail = (emailbody) => {
  const emailbodyforProcessor = {
    from: '"Yubaraj Store 👻" <yubaraj.100mgr@gmail.com>', // sender address
    to: emailbody.email, // list of receivers
    subject: "Email Verification instruction", // Subject line
    text: `${emailbody.fName}, please follow the link to verify your email: ${emailbody.url}`, // plain text body
    html: `
        <p>Hi ${emailbody.fName}</p>
        <br/>
        <br/>
        <p> Please follow the link to verify your email</p>
        <br/>
        <br/>
        <p> <a href ="${emailbody.url}">verify email</a></p>
        <p>
            Regards, <br/>
            Yubaraj Magar Store
        </p>
        `, // html body
  };
  emailProcessor(emailbodyforProcessor);
};

export const verificationNotification = (emailbody) => {
  const emailbodyforProcessor = {
    from: '"Yubaraj Store 👻" <yubaraj.100mgr@gmail.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Your account has been verified", // Subject line
    text: `${emailData.fName}, Your account has been verified, you may logged in now: ${emailData.url}`, // plain text body
    html: `
            <p>Hi ${emailData.fName}</p>
            <br/>
            <br/>
            <p>Your account has been verified, you may logged in now.<a href="${process.env.ROOT_DOMAIN}"/> ${process.env.ROOT_DOMAIN}</p>
            `, // html body
  };
  emailProcessor(emailbodyforProcessor);
};
