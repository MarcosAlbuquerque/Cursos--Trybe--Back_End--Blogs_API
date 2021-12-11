const router = require('express').Router();
const validateToken = require('../validations/validateToken');
const validatePost = require('../validations/validatePost');
const validateChangePost = require('../validations/validateChangePost');
const validateBlogPost = require('../validations/validateBlogPost');
const { createPost, allPosts, idByPosts, changePost, deletePost } = require('../controller/Posts');

router.post('/', validateToken, validatePost, validateBlogPost, createPost);
router.get('/', validateToken, allPosts);
router.get('/:id', validateToken, idByPosts);
router.put('/:id', validateToken, validateChangePost, changePost);
router.delete('/:id', validateToken, deletePost);

module.exports = router;