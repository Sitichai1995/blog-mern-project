const express = require('express');
const router = express.Router();
const {create, getAllBlogs, getSingleBlog, deleteBlog, updateBlog} = require('../Controller/blogController')
const {requireLogin} = require("../Controller/authController")

router.post('/create',requireLogin,create)
router.get('/blogs', getAllBlogs)
router.get('/blog/:slug', getSingleBlog)
router.delete('/blog/:slug',requireLogin, deleteBlog)
router.put('/blog/:slug',requireLogin, updateBlog)

module.exports = router;