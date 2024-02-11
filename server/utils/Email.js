const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
})
const sendEmail = (email,html) => {
    try {
        transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Verify Your Account",
            html: html
        })
        console.log("Email send sucessfully");
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = sendEmail;