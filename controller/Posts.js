const jwt = require('jsonwebtoken');
const { MESSAGE_ERROR16 } = require('../validations/messageError');
const { Category, User, BlogPosts, PostsCategory } = require('../models');
const segredo = process.env.JWT_SECRET;

async function createPost(req, res) {
  try {
    const token = req.headers.authorization;
    const { categoryIds, title, content } = req.body;
    const { data } = jwt.verify(token, segredo);
    const { email } = data;

    const user = await User.findAll({ where: { email } });
    const { id: userId } = user[0];

    const categories = await Category.findAll(
      {
        where: {
          id: categoryIds,
        },
      },
    );

    if (categories.length === 0) return res.status(400).json({ message: MESSAGE_ERROR16 });

    const dataCategory = categories;
    const { id } = dataCategory[0]

    const newBlogPost = await BlogPosts.create({ userId, title, content, published: new Date() })
    const { id: blogId } = newBlogPost.dataValues

    return res.status(201).json(
      {
        id: blogId,
        userId,
        title,
        content,
      }
    );
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  createPost,
};