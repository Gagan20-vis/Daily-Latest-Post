const User = require('../models/User')
const bcrypt = require('bcryptjs')
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.json({ success: false, field: 'user' });
        if (!user.verified) return res.json({ success: false, field: 'verify' });
        if (!(await bcrypt.compare(req.body.password, user.password))) return res.json({ success: false, field: 'password' });
        const token = user._id;
        req.session.token = token;
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false, field: 'error' });
    }
}
module.exports = login;