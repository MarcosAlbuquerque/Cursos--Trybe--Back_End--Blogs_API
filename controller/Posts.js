const jwt = require('jsonwebtoken');
const { BlogPosts, User, Category } = require('../models');
const { MESSAGE_ERROR17,
  MESSAGE_ERROR18, MESSAGE_ERROR19 } = require('../validations/messageError');

const segredo = process.env.JWT_SECRET;

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

async function idByPosts(req, res) {
  const { id } = req.params;
  const dataPosts = await BlogPosts.findOne({ where: { id } });

  if (dataPosts === null) return res.status(404).json({ message: MESSAGE_ERROR17 });
  if (typeof (dataPosts) === 'undefined') return res.status(404).json({ message: MESSAGE_ERROR17 });

  const dataUser = await User.findAll();
  const dataCategory = await Category.findAll();

  const result = Object.assign(
    dataPosts.dataValues,
    { user: dataUser[0].dataValues },
    { categories: [dataCategory[0].dataValues] },
  );

  return res.status(200).send(result);
}

async function sendPost(result) {
  const { id: postId, userId: postUser,
    title: postTitle, content: postContent, published, updated } = result;

  const dataCategory = await Category.findAll();

  return ({
    id: postId,
    userId: postUser,
    title: postTitle,
    content: postContent,
    published,
    updated,
    categories: [dataCategory[0]],
  });
}

async function changePost(req, res) {
  try {
    const { id } = req.params;
    const { content, title, categories } = req.body;
    const token = req.headers.authorization;
    const { data: { email } } = jwt.decode(token, segredo);
  
    const dataPosts = await BlogPosts.findOne({ where: { id } });
    if (dataPosts === null) return res.status(404).json({ message: 'Post Não encontrado' });
    const { userId: dataPostUser } = dataPosts;
  
    // pega id do usuario buscando pelo email decodificado
    const user = await User.findAll({ where: { email } });
    const { id: userId } = user[0];
  
    if (categories) return res.status(401).json({ message: MESSAGE_ERROR18 });
    if (dataPostUser !== userId) return res.status(401).json({ message: MESSAGE_ERROR19 });

    // atualiza postagem pelo id do usuario
    await BlogPosts.update({ content, title, updated: new Date() }, { where: { userId } });
    const result = await BlogPosts.findOne({ where: { userId } });
    
    return res.status(200).send(await sendPost(result));
  } catch ({ message }) {
    console.log(message);
  }
}

async function deletePost(req, res) {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { data: { email } } = jwt.decode(token, segredo);

  const dataPosts = await BlogPosts.findOne({ where: { id } });
  if (dataPosts === null) return res.status(404).json({ message: MESSAGE_ERROR17 });

  const { userId: dataPostUser } = dataPosts;

  // pega id do usuario buscando pelo email decodificado
  const user = await User.findAll({ where: { email } });
  const { id: userId } = user[0];

  if (dataPostUser !== userId) return res.status(401).json({ message: MESSAGE_ERROR19 });
  await BlogPosts.destroy(
    { 
      where: {
        id,
      },
    },
  );
  return res.status(204).send();
}

module.exports = {
  createPost,
  allPosts,
  idByPosts,
  changePost,
  deletePost,
};