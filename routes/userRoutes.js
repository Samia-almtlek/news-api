const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/login', UserController.login);

// CRUD Routes
router.post('/', UserController.createUser);    // Create User
router.get('/', UserController.getUsers);      // Get All Users
router.get('/:id', UserController.getUserById); // Get User By ID
router.put('/:id', UserController.updateUser); // Update User
router.delete('/:id', UserController.deleteUser); // Delete User

module.exports = router;
