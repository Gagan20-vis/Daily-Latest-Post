const mongoose = require('mongoose')
const { Schema } = mongoose
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
})
const User = mongoose.model('User', UserSchema);
module.exports = User;