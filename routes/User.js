const router = require('express').Router();
const validateRegistration = require('../validations/validateRegistration');
const validateToken = require('../validations/validateToken');
const { createUser, allUsers, idByUser, deleteUser } = require('../controller/User');

router.post('/', validateRegistration, createUser);
router.get('/', validateToken, allUsers);
router.get('/:id', validateToken, idByUser);
router.delete('/me', validateToken, deleteUser);

module.exports = router;