const { Category } = require('../models');
const { MESSAGE_ERROR16 } = require('../validations/messageError');

async function createPost(req, res) {
  try {
    const { categoryIds } = req.body;

    const categories = await Category.findAll(
      {
        where: {
          id: categoryIds,
        },
      },
    );

    if (categories.length === 0) return res.status(400).json({ message: MESSAGE_ERROR16 });

    return res.send(categoryIds);
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  createPost,
};