const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { MESSAGE_ERROR7 } = require('../validations/messageError');

const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

// Este endpoint usa o método create do Sequelize para salvar um usuário no banco.
async function createUser(req, res) {
  try {
    const { displayName, email, password, image } = req.body;
    const users = await User.findAll({ where: { displayName } });
    
    if (users.length >= 1) return res.status(409).json({ message: MESSAGE_ERROR7 });
  
    await User.create({ displayName, email, password, image });
  
    const token = jwt.sign(
      {
        data: { displayName, email, password, image } },
        process.env.JWT_SECRET,
        jwtConfig,
      );

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e);
  }
}

async function allUsers(req, res) {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
  }
}

async function idByUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
}

module.exports = {
  createUser,
  allUsers,
  idByUser,
};

/*
const router = require('express').Router()
const { User } = require('../models')

// Este endpoint usa o método findAll do Sequelize para retorno todos os users.
router.get('/', async (req, res) => {
  try {
    const users = User.findAll()

    return res.status(200).json(users)
  } catch (e) {
    console.log(e.message)

    res.status(500).json({ error: 'Algo deu errado', message: e["message"] });
  }
})

// Este endpoint usa o método findOne do Sequelize para buscar um usuário pelo id e email.
// URL a ser utilizada para o exemplo http://localhost:3000/user/search/1?email=aqui-o-email
router.get('/search/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    const user = await User.findOne({ where: { id, email }});

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método create do Sequelize para salvar um usuário no banco.
router.post('/', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const newUser = await User.create({ fullName, email });

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método update do Sequelize para alterar um usuário no banco.
router.put('/:id', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const { id } = req.params;

    const [updateUser] = await User.update(
      { fullName, email },
      { where: { id } },
    );

    console.log(updateUser); // confira o que é retornado quando o user com o id é ou não encontrado;

    if(!updateUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método destroy do Sequelize para remover um usuário no banco.
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.destroy(
      { where: { id } },
    );

    console.log(deleteUser) // confira o que é retornado quando o user com o id é ou não encontrado;

    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
*/