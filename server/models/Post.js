const mongoose = require('mongoose')
const { Schema } = mongoose;
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
    },
    image: {
        type: String,
        require: true
    },
    html: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        require: true
    },
    isActive: {
        type: String,
    }
})
const Post = mongoose.model('post', PostSchema)
module.exports = Post;