const router = require('express').Router();
const validateToken = require('../validations/validateToken');
const validatePost = require('../validations/validatePost');
const validateBlogPost = require('../validations/validateBlogPost');
const { createPost, allPosts } = require('../controller/Posts');

router.post('/', validateToken, validatePost, validateBlogPost, createPost);
router.get('/', validateToken, allPosts);

module.exports = router;