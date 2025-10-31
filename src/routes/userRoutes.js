const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /users - Create user
router.post('/', userController.createUser);

// GET /users - Get all users
router.get('/', userController.getAllUsers);

// GET /users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// PUT /users/:id - Update user
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;

