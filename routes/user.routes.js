const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/users', UserController.getUsers);
router.get('/users/:ssn', UserController.getUser);
router.post('/users', UserController.newUser);
router.delete('/users', UserController.deleteUsers);
router.delete('/users/:ssn', UserController.deleteUser);
router.put('/users/:ssn', UserController.replace);
router.patch('/users/:ssn', UserController.update);

module.exports = router;
