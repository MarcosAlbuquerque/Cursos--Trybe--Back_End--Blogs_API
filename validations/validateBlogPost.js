const jwt = require('jsonwebtoken');
const { MESSAGE_ERROR16 } = require('./messageError');
const { Category, User } = require('../models');

const segredo = process.env.JWT_SECRET;

async function validateBlogPost(req, res, next) {
  try {
    const token = req.headers.authorization;
    const { data: { email } } = jwt.decode(token, segredo);
    const { categoryIds, title, content } = req.body;

    const user = await User.findAll({ where: { email } });
    const { id: userId } = user[0];

    const categories = await Category.findAll({ where: { id: categoryIds } });
    console.log({ categories }, { categoryIds });

    if (categories.length === 0) return res.status(400).json({ message: MESSAGE_ERROR16 });
    const dataCategory = categories;
    const { id } = dataCategory;
    req.blogPost = { title, content, userId, id };

    next();
  } catch ({ message }) {
    console.log({ message });
  }
}

module.exports = validateBlogPost;