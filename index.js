const express = require('express');
const { Home, User, Login, Categories, Posts } = require('./routes');

const app = express();
require('dotenv').config();

app.listen(process.env.PORT || 3000, console.log(`Ligado na porta ${process.env.PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', Home);
app.use('/user', User);
app.use('/login', Login);
app.use('/categories', Categories);
app.use('/post', Posts);
