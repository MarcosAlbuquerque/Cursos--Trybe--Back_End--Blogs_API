const router = require('express').Router();
const validateToken = require('../validations/validateToken');
const validatePost = require('../validations/validatePost');
const validateBlogPost = require('../validations/validateBlogPost');
const { createPost } = require('../controller/Posts');

router.post('/', validateToken, validatePost, validateBlogPost, createPost);

module.exports = router;