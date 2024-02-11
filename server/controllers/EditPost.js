const Post = require('../models/Post')
const EditPost = async (req, res) => {
    if (!req.session.user) return res.json({ success: false });
    try {
        const body = req.body;
        const {id} = body;
        delete body.id;
        await Post.updateOne({ _id: id }, body);
        res.json({ sucess: true });
    } catch (error) {
        res.json({ sucess: false, error: error.message })
        console.log(error.message);
    }
}
module.exports = EditPost