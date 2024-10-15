const nodemailer = require("nodemailer");
const asynchandler = require("express-async-handler");
const sendMail = asynchandler(async ({ email, html, subject }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"DinoSaur" <no-reply@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html,
  });

  return info;
});

module.exports = sendMail;
