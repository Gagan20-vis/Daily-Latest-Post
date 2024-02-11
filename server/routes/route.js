const express = require('express')
const router = express.Router()
const login = require('../controllers/login')
const createAccount = require('../controllers/createAccount')
const ShowPost = require('../controllers/AllPost')
const AddPost = require('../controllers/AddPost')
const EditPost = require('../controllers/EditPost')
const DeletePost = require('../controllers/DeletePost')
const logout = require('../controllers/logout')
const auth = require('../middleware/auth');
const Verify = require('../controllers/Verify')
const isLogin = require('../controllers/isLoggedIn');
router.post('/login', login);
router.get('/isLogin', auth, isLogin);
router.post('/createAccount', createAccount);
router.get('/verify/:id/:token', Verify)
router.get('/ShowPost', auth, ShowPost)
router.post('/AddPost', auth, AddPost)
router.put('/EditPost', auth, EditPost);
router.delete('/DeletePost', auth, DeletePost);
router.delete('/logout', auth, logout);
module.exports = router;