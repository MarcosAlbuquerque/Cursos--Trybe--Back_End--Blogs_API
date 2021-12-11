const { BlogPosts, User, Category } = require('../models');

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

async function allPosts(req, res) {
  const dataPosts = await BlogPosts.findAll();
  const dataUser = await User.findAll();
  const dataCategory = await Category.findAll();

  // console.log(dataPosts[0].dataValues, dataUser[0].dataValues, dataCategory[0].dataValues);
  
  const result = Object.assign(
    dataPosts[0].dataValues,
    {
      user: dataUser[0].dataValues,
    },
    {
      categories: [dataCategory[0].dataValues],
    },
  );
  
  return res.status(200).send(
    [
      result,
    ],
  );
}

module.exports = {
  createPost,
  allPosts,
};