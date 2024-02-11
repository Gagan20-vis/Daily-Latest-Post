const User = require('../models/User')
const mongoose = require('mongoose')
const auth = async (req, res, next) => {
    try {
        if (!req.session.token) return next();
        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(req.session.token) });
        req.session.user = user;
        return next();
    } catch (error) {
        console.log(error.message)
        return next();
    }
}
module.exports = auth;