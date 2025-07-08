const express = require('express');

const UserController = require('../controller/users.js');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createNewUsers);
router.patch('/:idUser', UserController.updateUsers);
router.delete('/:idUser', UserController.deleteUsers);

module.exports = router