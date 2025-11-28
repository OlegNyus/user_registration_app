const userService = require('../services/userService');

// Get all users
async function getAllUsers(req, res) {
  try {
    // Parse pagination parameters from query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = userService.getAllUsers(page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get user by ID
async function getUserById(req, res) {
  try {
    const user = userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'Name and email are required' || 
        error.message === 'Email already exists' || 
        error.message === 'Invalid email format') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

// Update user by ID
async function updateUser(req, res) {
  try {
    const user = userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: error.message });
    } else if (error.message === 'Email already exists' || 
               error.message === 'Invalid email format' ||
               error.message === 'No fields to update') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

// Delete user by ID
async function deleteUser(req, res) {
  try {
    const user = userService.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

