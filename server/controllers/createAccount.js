const User = require('../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const Token = require('../models/Token')
const sendEmail = require('../utils/Email')
const createAccount = async (req, res) => {
    if (!req.session.user) {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) return res.json({ success: false, field: 'email' })
            const hashPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
            user = await new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            }).save();
            let token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save();
            const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
        </head>
        <body>
            <div className="container">
                <div className="heading">
                    <h1>Verify your email address</h1>
                </div>
                <div className="content">
                    <p>Dear Gagan, thanks for signing up an account with the backend project. Please click the button below to verify your email address.</p>
                    <a href="${process.env.BASE_URL}/user/verify/${user.id}/${token.token}">Verify Email</a>
                </div>
                <div className="footer">
                    <span id="span1">Copyright &#169; 2024 Gagan. All rights reserved.</span>
                    <span id="span2">Our mailing address is </span>
                    <a href="mailto:gaganvishwakarma46@gmail.com">gaganvishwakarma46@gmail.com</a>
                </div>
            </div>
        </body>
        </html>`
            sendEmail(user.email, html);
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false, field: 'error' });
        }
    }
}
module.exports = createAccount;