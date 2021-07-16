const nodemailer = require("nodemailer"); // email service
const fs = require("fs"); // read file
const path = require("path"); // access path
const handlebars = require("handlebars"); // template engine for HTML
require("dotenv").config();

const mailSubject = "Stains - Not Logged In For Past 90 Days"; // Mail subject
const mailBody = "You've not login for the last 90 days. Please login immediately to prevent your account from being delete."; // Mail body plain text


// SMTP service provider
let transporter = nodemailer.createTransport({
  service: "gmail", // can be other service provider
  auth: {
    user: process.env.EMAIL_ADD,
    pass: process.env.EMAIL_PASS
  },
});

// Read email template
const templateSource = fs.readFileSync(path.resolve("./public/email.hbs"), "utf8");
let mailHTML = handlebars.compile(templateSource);



let sendMail = (recipient) => {
  // Mail Options and Configurations
  let mailOptions = {
    from: process.env.EMAIL_ADD,
    to: recipient.email, // recipient's email address
    subject: mailSubject, // subject line
    text: mailBody, // plaintext version of the message
    html: mailHTML({name: recipient.name}) // html version of the message
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Failed to send notification email", err);
    } else {
      console.log("Email was sent successfully", data.response);
    }
  });
};

module.exports = sendMail;