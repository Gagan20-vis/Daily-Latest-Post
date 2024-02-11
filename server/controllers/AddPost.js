const Post = require('../models/Post')
const AddPost = async (req, res) => {
    if (!req.session.user) return res.json({ success: false });
    const { image, html, title, slug,isActive} = req.body;
    try {
        const post = {
            user: req.session.user._id,
            image,
            html,
            title,
            slug,
            isActive
        }
        await Post.create(post);
        res.json({ success: true })
    } catch (error) {
        res.json({ error: error.message })
        console.log(error.message);
    }
}
module.exports = AddPost;