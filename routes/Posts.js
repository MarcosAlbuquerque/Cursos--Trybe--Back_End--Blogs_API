const router = require('express').Router();
const validateToken = require('../validations/validateToken');
const validatePost = require('../validations/validatePost');
const validateBlogPost = require('../validations/validateBlogPost');
const { createPost, allPosts, idByPosts } = require('../controller/Posts');

router.post('/', validateToken, validatePost, validateBlogPost, createPost);
router.get('/', validateToken, allPosts);
router.get('/:id', validateToken, idByPosts);

module.exports = router;