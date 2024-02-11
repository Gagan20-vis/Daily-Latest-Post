const Post = require('../models/Post')
const DeletePost = async (req, res) => {
    if (!req.session.user) return res.json({ success: false });
    try {
        await Post.deleteOne({ _id: req.body.id });
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false, error: error.message })
        console.log(error.message)
    }
}
module.exports = DeletePost