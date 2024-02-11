const isLogin = (req, res) => {
    if (!req.session.user) res.json({ success: false });
    else res.json({ success: true ,user:req.session.user});
}
module.exports = isLogin;