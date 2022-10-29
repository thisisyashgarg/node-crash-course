const express = require('express');
const Blog = require('../models/blogs');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/blogs', blogController.blog_index);
router.get('/blogs/create', blogController.blog_create_get);
router.delete('/blogs/:id', blogController.blog_delete);
router.post('/blogs', blogController.blog_create_post);
router.get('/blogs/:id', blogController.blog_details);

module.exports = router;