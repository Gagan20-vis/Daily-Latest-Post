const Post = require('../models/Post')
const ShowPost = async (req, res) => {
    try {
        if (!req.session.user) return res.json({ success: false });
        const posts = await Post.find();
        res.json({ success: true, posts: posts });
    } catch (error) {
        res.json({ error: error.message })
        console.log(error.message)
    }
}
module.exports = ShowPost;