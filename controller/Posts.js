const { BlogPosts/* , PostsCategory */ } = require('../models');

async function createPost(req, res) {
  try {
    const { title, content, userId } = req.blogPost;

    const newBlogPost = await BlogPosts.create({ userId, title, content, published: new Date() });
    const { id: blogId } = newBlogPost.dataValues;

    return res.status(201).json(
      {
        id: blogId,
        userId,
        title,
        content,
      },
    );
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  createPost,
};